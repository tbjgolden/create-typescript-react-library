# `typescript-library-starter`

This starter enables simple creation of libraries using TypeScript.

It can be used for libraries either **_with or without_** React/JSX.

It includes automatic API documentation generation and (optionally) a website to
show it; Storybook and Jest integration for development.

> Inspired by the best bits of `alexjoverm/typescript-library-starter` and
> `tanem/generator-typescript-react-lib`.

## Features

from `tanem/generator-typescript-react-lib`:

- [x] Generates CommonJS, ES module, and Universal Module Definition bundles via
      Rollup.
- [x] Tests bundles via Jest.
- [x] Generates Typescript type declarations for publishing.
- [x] Outputs, strips, or wraps PropTypes declarations according to bundle type.
- [x] Makes Universal Module Definition bundles available via unpkg.

from `alexjoverm/typescript-library-starter`

- [x] Code of conduct
- [x] Contributing boilerplate

from me

- [x] interactive setup script which asks the basics to help get you up and
      running
- [x] version controlled engines like node and yarn with asdf
- [x] docusaurus website integrated with typedoc generated api docs
- [x] Storybook integration
- [x] Semantic releases
### Requirements

`curl` `git` `fish` `node` `yarn`

## Setup

### Step 1. Local setup

```sh
# Clone this directory locally, and cd into it
git clone https://github.com/tbjgolden/typescript-library-starter.git <yourdir>
cd <yourdir>

# Clear the git history from the starter
rm -rf .git

# Start the custom setup script, and install dependencies
yarn

# An example is in examples/basic-usage, let's also install its dependencies
cd examples/basic-usage
yarn

# Check everything is set up correctly
cd ../..
yarn test

# Finally, let's initialize a new git repository
git init
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

This will:

1. run Storybook (if there are `src/**/*.stories.{ts,tsx}` files).
2. run Jest in watch mode (if there are `src/**/*.spec.{ts,tsx}` files)

> Note: It will do nothing if no matching `.stories.` or `.spec.` files are
> found.

#### `yarn start` on the included example

`examples/basic-usage` is an basic project bootstrapped with Create React App,
which you can use to demo an example of how to use the library you're making. To
run it, run `yarn start` inside `examples/basic-usage`.

## I'm not creating a React library

```sh
yarn remove react react-dom
```

### Also, my library is for node, not the browser

Remove the `browser` key in package.json.

## How to get along with this starter

There's a few things I've learnt about Rollup, Webpack, Babel and TypeScript
configurations from setting it up a couple of times. Some of those things have
found their way into this project as light opinions for how a project should be
set up.

- The core idea of this project is setting stuff up such that it is easier to
  remove stuff than add it; start with batteries include it, expose the
  internals (looking at you react-scripts 😜) and give some helpful scripts to
  make removing them a little easier.
- Rollup vs Webpack. I've tried generating libraries with Webpack before but
  they had two main problems; it produces much bigger bundles and it doesn't
  generate ES modules. The rollup ecosystem is smaller, and the docs can be
  overwhelming, but everything is there
- Keep the main src/index file free of JSX, and instead use it to be a root file
  for other source files. Avoid changing the extension of this file to `tsx`.
  Instead, add `export * from './some/path/to/file'` (where
  src/some/path/to/file.tsx can contain JSX) to src/index.ts
- If you want to bundle a package you're importing, stick it in dependencies. If
  you'd like the user of your library to install it as a peer dependency,
  install it as a peer dependency
  - Peer dependencies in web (umd) builds are imported by getting it from the
    window object. Web versions of different dependencies often use different
    global names (`window.$` might be used in `import ... from "jquery"`). For
    web builds to work, you'll have to add the correct global name to the
    knownDependencyNames map in rollup.config.js
- Avoid the PropTypes library; use TypeScript types instead; if you're new to
  React in TypeScript, check out the
  [React TypeScript cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)
- TypeScript configs are a hassle to configure for libraries. There's a
  tsconfig.eslint.json file at the base of this project, which extends the build
  tsconfig with settings to enable better linting
- The rollup config currently uses the old package for some rollup plugins. I
  tried to upgrade this but it opened a pandora's box of challenges that I've so
  far been unable to solve (would welcome help!)
