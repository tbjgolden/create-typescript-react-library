const srcConfig = require('./config.src')

module.exports = Object.assign({}, srcConfig, {
  collectCoverage: false,
  moduleNameMapper: {
    '^../src$': `<rootDir>/dist/gocvmmeyaahgakggbjwmcmif.umd.production.js`
  }
})
