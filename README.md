# `typescript-library-starter`

> rwmgkcxafpdrkuvtfszrfvwv

Derived from `alexjoverm/typescript-library-starter` and
`tanem/generator-typescript-react-lib`.

This library is oriented around giving a low maintenance option for open source
creators of JS (and React!) libraries written with TypeScript.

## What's included?

- Toolchain for creating libraries written in TypeScript

from `tanem/generator-typescript-react-lib`:

- Generates CommonJS, ES module, and Universal Module Definition bundles via
  Rollup.
- Tests bundles via Jest.
- Generates Typescript type declarations for publishing.
- Outputs, strips, or wraps PropTypes declarations according to bundle type.
- Configures Renovate for dependency management.
- Adds scripts for releasing to npm.
- Makes Universal Module Definition bundles available via unpkg.

from `alexjoverm/typescript-library-starter`

- Code of conduct
- Contributing boilerplate
- Semantic releases

from me

- interactive setup script which asks the basics to help get you up and running
- docusaurus website integrated with typedoc generated api docs
- github actions setup
- dotenv stuff
- https://github.com/kentcdodds/all-contributors

### Alternatives

If you're managing 3+ repos, Kent C. Dodds' setup (or a fork of) is likely a
better choice: https://github.com/kentcdodds/kcd-scripts

### Gotchas

- No Windows support
- Expects `yarn` instead of `npm`

## Setup

```sh
# Clone
git clone https://github.com/tbjgolden/typescript-library-starter.git <directory>

# Install dependencies and run setup
cd <directory>
yarn # This will ask you some questions to give you a tailored boilerplate
# if you skip some questions (i.e. SIGTERM), you can still run `node setup.js`

# Install example dependencies
cd examples/basic-usage
yarn

# test it's working with:
yarn test # this builds everything, then tests the bundles
```

<!--
## Main Scripts

```
yarn start

do we need to choose? ⬇

if (src contains .tsx file) {
  // get react live reload working somehow
  // potential solutions: yarn link, --check-files, react storybook
} else {
  // get tdd running somehow
  // maybe enhance test suite with some clever automatic mocks
  // performance testing
}
```
-->

# Project Website

The website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern
static website generator.

### Local Development

```
$ yarn start:site
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build:site
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy:site
```

If you are using GitHub pages for hosting, this command is a convenient way to
build the website and push to the `gh-pages` branch.
