# `create-typescript-react-library`

> **This starter enables simple creation of libraries using TypeScript.**

## Features

- [x] rollup for producing the smallest bundles
- [x] tests and coverage with jest
- [x] cute github readme badges (a.k.a. shields)
- [x] generates type declarations
- [x] set up by default to create esm, cjs and umd (script tag) exports
- [x] includes license, code of conduct, contributing instructions
- [x] very shiny interactive setup script
- [x] automated semantic releases
- [x] automated api docs generation
- [x] add react with a single command
- [x] context-dependent start script (tdd jest, plus storybook for react)

And if there's a need you have that isn't included, leave an issue!

### Requirements

`curl` `git` `node` `yarn`

## Setup

### Step 1. Local setup

```sh
yarn create typescript-react-library <yourdir>
cd <yourdir>

# if adding react
yarn ctrl add-react
```

### Step 2. Start developing!

Scripts:

- `yarn start` - Starts a dev friendly environment
- `yarn test` - Turns your project into bundles and tests them
- `yarn lint` - Checks your project for linting errors
- `yarn coverage` - Checks your code coverage

Also more via:

- `yarn ctrl` - Used to run useful scripts via ctrl-scripts (ctrl is short for
  create-typescript-react-library)

### Step 3. Github setup

1. Create an NPM token:
   https://docs.npmjs.com/creating-and-viewing-authentication-tokens
2. Create a Github repo of the **same name** that you selected in the setup
   script
3. Add your NPM token to your repository's secrets: your-repo > Settings >
   Secrets > New Secret `NPM_TOKEN=<your token from Step 1>`
4. Add, commit -m "feat: Initial release" and push your code

Your code will be published to npm. All future commits to the `main` branch will
be handled by semantic-release.

---

If you need to change the config to fit your use case - go for it! (Though do so
after running any relevant ctrl-scripts, as they will mutate configs for you if
you have not changed too much)
