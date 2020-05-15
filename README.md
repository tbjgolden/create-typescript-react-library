# `typescript-library-starter`

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

- code of conduct
- contributing boilerplate
- semantic releases
- github pages docs

from me

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

## Main scripts

```
yarn start

if (src contains .tsx file) {
  // get react live reload working somehow
  // potential solutions: yarn link, --check-files, react storybook
} else {
  // get tdd running somehow
  // maybe enhance test suite with some clever automatic mocks
  // performance testing
}
```
