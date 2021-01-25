import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import dedent from 'dedent'

import json from '@rollup/plugin-json'

import pkg from './package.json'

const browserGlobals = {
  'react-dom': 'ReactDOM',
  'react': 'React',
  'lodash': '_',
  'underscore': '_',
  'jquery': '$',
  'zepto': '$'
}

const getExternal = (bundleType) => {
  const peerDependencies = Object.keys(pkg.peerDependencies || {})
  const dependencies = Object.keys(pkg.dependencies)

  const makeExternalPredicate = (externals) => {
    if (externals.length === 0) {
      return () => false
    } else {
      const pattern = new RegExp(`^(${externals.join('|')})($|/)`)
      return (id) => pattern.test(id)
    }
  }

  switch (bundleType) {
    case 'CJS_DEV':
    case 'CJS_PROD':
    case 'ES':
      return makeExternalPredicate([...peerDependencies, ...dependencies])
    default:
      return makeExternalPredicate(peerDependencies)
  }
}

const getPlugins = (bundleType) => [
  nodeResolve(),
  commonjs({
    include: 'node_modules/**'
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['@babel/env', { loose: true, modules: false }], '@babel/react'],
    plugins: ['@babel/transform-runtime'],
    runtimeHelpers: true
  }),
  json(),
  replace({
    'process.env.NODE_ENV':
      bundleType === 'UMD' ? '"production"' : '"development"'
  }),
  sourcemaps(),
  sizeSnapshot(),
  bundleType === 'UMD' &&
    terser({
      output: { comments: false },
      compress: {
        keep_infinity: true,
        pure_getters: true
      },
      warnings: true,
      ecma: 5,
      toplevel: false
    })
]

export default [
  {
    input: './compiled/index.js',
    external: getExternal('CJS_DEV'),
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    plugins: getPlugins('CJS_DEV')
  },
  {
    input: './compiled/index.js',
    external: getExternal('ES'),
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    plugins: getPlugins('ES')
  },
  {
    input: './compiled/index.js',
    external: getExternal('UMD_PROD'),
    output: {
      file: pkg.umd,
      format: 'umd',
      globals: Object.keys(pkg.peerDependencies || {}).reduce(
        (dependencyNameMap, npmDependency) => ({
          ...dependencyNameMap,
          [npmDependency]:
            browserGlobals[npmDependency] ||
            ((npmDependency) => {
              const pascal = npmDependency
                .split('-')
                .map((str) =>
                  str.length > 0 ? str[0].toUpperCase() + str.slice(1) : ''
                )
                .join('')
              console.warn(
                dedent`
                Blindly guessing that the browser global (i.e. window.<NAME>) for npm package...
                  "${npmDependency}"
                ...is...
                  "${pascal}"

                To fix this message
                  '${npmDependency}': '<NAME>',
                to 'browserGlobals' in rollup.config.js

                `
              )
              return pascal
            })()
        }),
        {}
      ),
      name: 'Gocvmmeyaahgakggbjwmcmif',
      sourcemap: true
    },
    plugins: getPlugins('UMD_PROD')
  }
]
