const fs = require('fs-extra')
const path = require('path')
const dedent = require('dedent')

fs.removeSync(path.join(__dirname, '../website'))

fs.writeFileSync(
  path.join(__dirname, '../.github/workflows/site.yml'),
  dedent`
    name: Deploy Site

    on:
      push:
        branches:
          - master
        paths:
          - '.github/workflows/site.yml'
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

          - run: npx typedoc --mode file --out typedoc --theme minimal src/index.tsx

          - name: Deploy
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${'${{ secrets.GITHUB_TOKEN }}'}
              publish_dir: ./typedoc
  `
)
