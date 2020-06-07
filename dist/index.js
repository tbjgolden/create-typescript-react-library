'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./compare-stylesheet.cjs.production.js')
} else {
  module.exports = require('./compare-stylesheet.cjs.development.js')
}
