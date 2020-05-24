#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const dedent = require('dedent')

fs.removeSync(path.join(__dirname, '../website'))
fs.removeSync(path.join(__dirname, '../.github/workflows/site.yml'))

fs.writeFileSync(
  path.join(__dirname, '../.github/workflows/docs.yml'),
  dedent`
    name: Generate Docs

    on:
      push:
        branches:
          - master
        paths:
          - '.github/workflows/docs.yml'
          - 'src/**'

    jobs:
      site:
        runs-on: ubuntu-18.04
        steps:
          - uses: actions/checkout@v2

          - name: Setup Node
            uses: actions/setup-node@v1
            with:
              node-version: '12.x'

          - run: yarn install --frozen-lockfile

          - run: npx typedoc --mode file --out docs/api --theme markdown --readme none src/index.tsx

          - name: Deploy
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${'${{ secrets.GITHUB_TOKEN }}'}
              publish_dir: ./typedoc
  ` + '\n'
)

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
          'https://xrdnwftmsmirdshgpfoyocjh.github.io/gocvmmeyaahgakggbjwmcmif/docs',
          'docs'
        )
    )
  }
})

fs.mkdirpSync(path.join(__dirname, '../docs'))
fs.writeFileSync(
  path.join(__dirname, '../docs/README.md'),
  dedent`
    # Docs

    Table of Contents
    =================

      * [API](./api)
  `
)
