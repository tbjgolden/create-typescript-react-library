#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync, spawn } = require('child_process')
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
    `git clone --depth 1 https://github.com/tbjgolden/create-typescript-react-library.git '${answer}'`
  )
  execSync(`yarn`, { cwd: newDir })
  execSync(`rm -rf .git`, { cwd: newDir })
  execSync(`git init`, { cwd: newDir })

  const installer = spawn('yarn', ['ctrl', 'setup'], {
    cwd: newDir,
    stdio: 'inherit'
  })

  installer.on('close', (code) => {
    console.log(
      `Change to your new library directory:\n  cd ${path.relative(
        process.cwd(),
        newDir
      )}`
    )
    process.exit(code)
  })
}

if (require.main === module) {
  run(...process.argv.slice(2))
}

module.exports = run
