import srcConfig from './config.src'

module.exports = {
  ...srcConfig,
  collectCoverage: false,
  moduleNameMapper: {
    '^../src$': `<rootDir>/dist/test.esm.js`
  }
}
