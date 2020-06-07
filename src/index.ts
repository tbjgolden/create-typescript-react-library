import csso from 'csso'
import csstree, { StyleSheetPlain, BlockPlain, CssNode } from 'css-tree'

export const normalize = (css: string): string[][] => {
  const minifiedCSS = csso.minify(css).css

  const list: string[][] = []
  const ast = csstree.toPlainObject(csstree.parse(minifiedCSS))
  normalizeBlock(
    ast as StyleSheetPlain,
    (path) => {
      list.push(path)
    },
    []
  )

  return list
    .map((path): [string[], string] => [path, JSON.stringify(path)])
    .sort(([, jsonPathA], [, jsonPathB]) => (jsonPathA > jsonPathB ? 1 : -1))
    .map(([path]) => path)
}

export const compare = (a: string, b: string): [string[][], string[][]] => {
  const normalizedA = normalize(a)
  const normalizedB = normalize(b)

  if (JSON.stringify(normalizedA) === JSON.stringify(normalizedB)) {
    return [[], []]
  } else {
    const aPaths = new Map<string, boolean>()
    const missingInA = new Set<string>()
    const missingInB = new Set<string>()
    normalizedA.forEach((path) => {
      aPaths.set(JSON.stringify(path), false)
    })
    normalizedB.forEach((path) => {
      const jsonPath = JSON.stringify(path)
      if (aPaths.has(jsonPath)) {
        aPaths.set(jsonPath, true)
      } else {
        missingInA.add(jsonPath)
      }
    })
    aPaths.forEach((value, key) => {
      if (value === false) {
        missingInB.add(key)
      }
    })
    return [
      [...missingInA.values()].map((value) => JSON.parse(value)),
      [...missingInB.values()].map((value) => JSON.parse(value))
    ]
  }
}

export const areEqual = (a: string, b: string): boolean => {
  const pair = compare(a, b)
  return pair[0].length + pair[1].length === 0
}

export const isSubsetOf = (sub: string, sup: string): boolean =>
  compare(sup, sub)[0].length === 0

const normalizeBlock = (
  node: StyleSheetPlain | BlockPlain,
  addPath: (path: string[]) => void,
  path: string[]
) =>
  node.children
    .map((child) => {
      if (child.type === 'Atrule') {
        let atruleprelude = `@${child.name}`
        if (child.prelude !== null) {
          atruleprelude += ` ${csstree.generate(child.prelude as CssNode)}`
        }

        if (child.block === null) {
          addPath([...path, atruleprelude])
        } else {
          normalizeBlock(child.block, addPath, [...path, atruleprelude])
        }
      } else if (child.type === 'Rule') {
        if ('children' in child.prelude) {
          const selectors = child.prelude.children
            .filter((child) => child.type === 'Selector')
            .map((selector) => csstree.generate(selector as CssNode))

          selectors.map((selector) => {
            normalizeBlock(child.block, addPath, [...path, selector])
          })
        }
      } else if (child.type === 'Declaration') {
        addPath([
          ...path,
          child.property,
          csstree.generate(child.value as CssNode)
        ])
      }
    })
    .filter(Boolean)
