# `typescript-library-starter`

This starter enables simple creation of libraries using TypeScript.

It can be used for libraries either **_with or without_** React/JSX.

It includes automatic API documentation generation and tools for development.

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

# Check everything is set up correctly
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
