# `create-typescript-react-library`

[![npm version](https://img.shields.io/npm/v/create-typescript-react-library.svg?style=flat-square)](https://www.npmjs.com/package/create-typescript-react-library)
[![test coverage](https://img.shields.io/badge/dynamic/json?style=flat-square&color=brightgreen&label=coverage&query=%24.total.branches.pct&suffix=%25&url=https%3A%2F%2Funpkg.com%2Fcreate-typescript-react-library%2Fcoverage%2Fcoverage-summary.json)](https://www.npmjs.com/package/create-typescript-react-library)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tbjgolden/create-typescript-react-library/Release?style=flat-square)](https://github.com/tbjgolden/create-typescript-react-library/actions?query=workflow%3ARelease)

> **This starter enables simple creation of libraries using TypeScript.**

## Features

- [x] rollup for smallest bundles
- [x] tests with jest (+coverage)
- [x] generates type declarations
- [x] esm, cjs and umd (script tag) exports
- [x] admin (code of conduct, contributing instructions)
- [x] interactive setup script
- [x] automated semantic releases
- [x] automated api docs generation
- [x] add react with a single command
- [x] context-dependent start script (tdd jest, plus storybook for react)

### Requirements

- `curl`
- `git`
- `node`
- `yarn`

## Setup

### Step 1. Local setup

```sh
yarn create typescript-react-library <yourdir>
cd <yourdir>

# install dependencies
yarn
# start setup
yarn ctrl setup
# re-init history
rm -rf .git
git init
# if adding react
yarn ctrl add-react
# create repo and push changes
git add -A
git commit -m 'Initial commit' --no-verify
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

### Step 2. Github setup

1. Create an NPM token:
   https://docs.npmjs.com/creating-and-viewing-authentication-tokens
2. Create a Github repo of the **same name** that you selected in the setup
   script
3. Add the NPM token to your repository's secrets: your-repo > Settings >
   Secrets > New Secret `NPM_TOKEN=<your token from Step 1>`

### Step 3. Go!

#### `yarn start`

---

## I'm not creating a React library

```sh
yarn remove react react-dom
```

### Also, my library is for node, not the browser

Remove the `browser` key in package.json.

## Pointers

- If you want to bundle a package you're importing, stick it in dependencies. If
  you'd like the user of your library to install it as a peer dependency,
  install it as a peer dependency
  - Peer dependencies in web (umd) builds are imported by getting it from the
    window object. Web versions of different dependencies often use different
    global names (`window.$` might be used in `import ... from "jquery"`). For
    web builds to work, you'll have to add the correct global name to the
    knownDependencyNames map in rollup.config.js
