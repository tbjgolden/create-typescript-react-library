'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./b.cjs.production.js')
} else {
  module.exports = require('./b.cjs.development.js')
}
