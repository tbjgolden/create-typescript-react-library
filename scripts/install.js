#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = async (str) => {
  return new Promise((resolve) => {
    rl.question(str + ' ', (answer) => {
      resolve(answer)
      rl.close()
    })
  })
}

const run = async () => {
  const answer = (await ask('New directory name for library?')).trim()

  if (answer.length === 0) {
    throw new Error(`No name entered, exiting`)
  }

  const newDir = path.join(process.cwd(), answer)
  let exists = false
  try {
    if (fs.statSync(newDir)) {
      exists = true
    }
  } catch {}

  if (exists) {
    throw new Error(`That path already exists, exiting`)
  }

  execSync(
    `git clone --depth 1 https://github.com/tbjgolden/typescript-library-starter.git '${answer}'`
  )
  execSync(`yarn`, { cwd: newDir })
  execSync(`./node_modules/.bin/ts-node ./scripts/setup.ts`, { cwd: newDir })
}

if (require.main === module) {
  run(process.argv.slice(2))
}

module.exports = run

/*
# do this in setup.ts
rm -rf .git
git init
git add -A
git commit -m 'Initial commit' --no-verify
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
*/
