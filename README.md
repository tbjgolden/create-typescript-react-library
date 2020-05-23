# `typescript-library-starter`

> rwmgkcxafpdrkuvtfszrfvwv

Derived from `alexjoverm/typescript-library-starter` and
`tanem/generator-typescript-react-lib`.

This library is oriented around giving a low maintenance option for open source
creators of JS (and React!) libraries written with TypeScript.

## What's included?

- Toolchain for creating libraries written in TypeScript

from `tanem/generator-typescript-react-lib`:

- [x] Generates CommonJS, ES module, and Universal Module Definition bundles via
      Rollup.
- [x] Tests bundles via Jest.
- [?] Generates Typescript type declarations for publishing.
- [x] Outputs, strips, or wraps PropTypes declarations according to bundle type.
- [?] Configures Renovate for dependency management.
- [x] Makes Universal Module Definition bundles available via unpkg.

from `alexjoverm/typescript-library-starter`

- [x] Code of conduct
- [x] Contributing boilerplate
- [x] Version control asdf

from me

- [x] interactive setup script which asks the basics to help get you up and
      running
- [x] docusaurus website integrated with typedoc generated api docs
- [x] autogenerated coverage svg shield
- [x] Semantic releases

### Alternatives

If you're managing 3+ repos, Kent C. Dodds' setup (or a fork of) is likely a
better choice: https://github.com/kentcdodds/kcd-scripts

### Gotchas

- No Windows support
- Expects `yarn` instead of `npm`

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

# An example is in examples/basic-usage, let's also install its dependencies
cd examples/basic-usage
yarn

# To see the example alive, run this (inside the examples/basic-usage directory)
yarn start

# Finally, let's initialize a new git repository
git init
git add -A
git commit -m 'Initial commit' # This will not trigger an npm release
git remote add origin https://github.com/tbjgolden/sADFGHJK-.git
git push -u origin master


```

### Step 2. Github setup

1. Create an NPM token:
   https://docs.npmjs.com/creating-and-viewing-authentication-tokens
2. Create a Github repo of the **same name** that you selected in the setup
   script
3. Add the NPM token to your repository's secrets:  
   your-repo > Settings > Secrets > New Secret  
   `NPM_TOKEN=<your token from Step 1>`

> This will enable automatic releases that follow semantic versioning rules, by
> reading your commit messages. The commit messages will need to be in the
> [conventional changelog](https://github.com/conventional-changelog/conventional-changelog)
> format. A commit message hook will help you make sure that your commit
> messages are correctly formatted.

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
