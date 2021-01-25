#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const dedent = require('dedent')

fs.removeSync(path.join(__dirname, '../website'))
fs.removeSync(path.join(__dirname, '../.github/workflows/site.yml'))

const files = [
  path.join(__dirname, '../LIBRARY_README.md'),
  path.join(__dirname, '../README.md')
]

files.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      fs
        .readFileSync(file, 'utf8')
        .replace(
          new RegExp(
            'https://xrdnwftmsmirdshgpfoyocjh.github.io/gocvmmeyaahgakggbjwmcmif/docs'.replace(
              /[-\/\\^$*+?.()|[\]{}]/g,
              '\\$&'
            ),
            'g'
          ),
          'docs'
        )
    )
  }
})
