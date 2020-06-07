import { normalize, compare, areEqual, isSubsetOf } from './index'

const stylesheet = `
@charset "UTF-8";
@import 'global.css';

.lightgray {
  color: lightgray;
  background-color: black;
}
@supports (display: flex) and (-webkit-appearance: checkbox) {
  .red {
    color: red;
  }
}
@font-face {
  font-family: 'MyWebFont';
  src:  url('myfont.woff2') format('woff2'),
        url('myfont.woff') format('woff');
}
@keyframes pulse {
  0% {
    background-color: #001f3f;
  }
  100% {
    background-color: #ff4136;
  }
}
@page :first {
  margin: 1in;
}
@media (min-width: 384px) and screen {
  .blue {
    color: blue;
  }

  @media (max-width: 768px) {
    .green {
      color: green;
    }
  }

  .yellow {
    color: yellow;
  }
}
@media (min-width: 768px) {
  .white {
    color: white;
  }
}
.black {
  color: black;
}
`

describe('compare stylesheet', () => {
  test('normalize', () => {
    expect(normalize(stylesheet)).toEqual([
      ['.black', 'color', '#000'],
      ['.lightgray', 'background-color', '#000'],
      ['.lightgray', 'color', '#d3d3d3'],
      ['@charset "UTF-8"'],
      ['@font-face', 'font-family', "'MyWebFont'"],
      [
        '@font-face',
        'src',
        "url(myfont.woff2) format('woff2'),url(myfont.woff) format('woff')"
      ],
      ["@import 'global.css'"],
      ['@keyframes pulse', '0%', 'background-color', '#001f3f'],
      ['@keyframes pulse', 'to', 'background-color', '#ff4136'],
      ['@media (min-width:384px) and screen', '.blue', 'color', '#00f'],
      ['@media (min-width:384px) and screen', '.yellow', 'color', '#ff0'],
      [
        '@media (min-width:384px) and screen',
        '@media (max-width:768px)',
        '.green',
        'color',
        'green'
      ],
      ['@media (min-width:768px)', '.white', 'color', '#fff'],
      ['@page :first', 'margin', '1in'],
      [
        '@supports (display:flex) and (-webkit-appearance:checkbox)',
        '.red',
        'color',
        'red'
      ]
    ])
  })
  test('compare', () => {
    expect(compare(stylesheet, stylesheet)).toEqual([[], []])
    const [a, b] = compare('', stylesheet)
    const [c, d] = compare(stylesheet, '')
    expect(a).toEqual(d)
    expect(b).toEqual(c)
    const [e, f] = compare(
      stylesheet,
      '.lightgray{color:#D3D3D3}.magenta{color:magenta}'
    )
    expect(e).toEqual([['.magenta', 'color', '#f0f']])
    expect(f).toEqual([
      ['.black', 'color', '#000'],
      ['.lightgray', 'background-color', '#000'],
      ['@charset "UTF-8"'],
      ['@font-face', 'font-family', "'MyWebFont'"],
      [
        '@font-face',
        'src',
        "url(myfont.woff2) format('woff2'),url(myfont.woff) format('woff')"
      ],
      ["@import 'global.css'"],
      ['@keyframes pulse', '0%', 'background-color', '#001f3f'],
      ['@keyframes pulse', 'to', 'background-color', '#ff4136'],
      ['@media (min-width:384px) and screen', '.blue', 'color', '#00f'],
      ['@media (min-width:384px) and screen', '.yellow', 'color', '#ff0'],
      [
        '@media (min-width:384px) and screen',
        '@media (max-width:768px)',
        '.green',
        'color',
        'green'
      ],
      ['@media (min-width:768px)', '.white', 'color', '#fff'],
      ['@page :first', 'margin', '1in'],
      [
        '@supports (display:flex) and (-webkit-appearance:checkbox)',
        '.red',
        'color',
        'red'
      ]
    ])
    const [g, h] = compare(stylesheet, `${stylesheet}.magenta{color:magenta}`)
    expect(g).toEqual([['.magenta', 'color', '#f0f']])
    expect(h).toEqual([])
  })
  test('areEqual', () => {
    expect(areEqual('', '')).toBe(true)
    expect(areEqual(stylesheet, stylesheet)).toBe(true)
    expect(areEqual('', stylesheet)).toBe(false)
    expect(areEqual(stylesheet, '')).toBe(false)
  })
  test('isSubsetOf', () => {
    expect(isSubsetOf('', '')).toBe(true)
    expect(isSubsetOf(stylesheet, stylesheet)).toBe(true)
    expect(isSubsetOf('', stylesheet)).toBe(true)
    expect(isSubsetOf(stylesheet, '')).toBe(false)
    expect(isSubsetOf('.black{color:#000000}', stylesheet)).toBe(true)
    expect(isSubsetOf(stylesheet, '.black{color:#000000}')).toBe(false)
  })
})
