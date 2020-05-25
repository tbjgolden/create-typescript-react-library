import { id } from './index'

describe('id function', () => {
  it('should generate id correctly with default', async () => {
    expect(/^lolz-\d{5,}$/.test(id('lolz'))).toBe(true)
  })

  it('should generate id correctly without default', async () => {
    expect(/^id-\d{5,}$/.test(id())).toBe(true)
  })
})
