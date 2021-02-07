# `create-typescript-react-library`

This starter enables simple creation of libraries using TypeScript.

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

- all of: `curl` `git` `node` `yarn`
- one of: `sh` `bash` `zsh`

## Setup

### Step 1. Local setup

```sh
# clone
git clone --depth 1 https://github.com/tbjgolden/create-typescript-react-library.git <yourdir>
cd <yourdir>
# setup
yarn
npx ctrl setup
# re-init history
rm -rf .git
git init
git add -A
# create repo and push changes
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

This will:

1. run Storybook (if there are `src/**/*.stories.{ts,tsx}` files).
2. run Jest in watch mode (if there are `src/**/*.test.{ts,tsx}` files)

> Note: It will do nothing if no matching `.stories.` or `.test.` files are
> found.

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
