#!/usr/bin/env node

// find files from eslint ignore

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const descriptions = {
  'Repo Name':
    'The name of both your repository and the associated npm package',
  'Variable':
    'The name of the variable that people will refer to your library from. e.g. "Lorem" will export as window.Lorem and import Lorem from "..."',
  'Github Username': 'Your Github username',
  'Author Name': 'The name of the main author',
  'Author Email': 'The email of the main author'
}

const regexes = {
  'Repo Name': /^[a-z0-9]+(-[a-z0-9])*$/,
  'Variable': /^[a-zA-Z][a-zA-Z0-9]*$/,
  'Github Username': /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
  'Author Name': /^[^"]*$/,
  'Author Email': /^[^"]*$/
}

const ref = { rl: null, ended: false }

const start = () => {
  ref.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  ref.ended = false
  ref.rl.on('close', () => {
    ref.ended = true
  })
  return Promise.resolve(ref.rl)
}

const ask = (question, regex) =>
  new Promise((resolve) => {
    ref.rl.question(question, (name) => {
      if (regex.test(name)) {
        resolve(name)
      } else {
        ask(question, regex).then((name) => resolve(name))
      }
    })
  })

const stop = () =>
  new Promise((resolve) => {
    if (!ref.ended) ref.rl.close()
    resolve()
  })

const askAll = (questions) => {
  let promise = start().then(() => [])
  for (let i = 0; i < questions.length; i++) {
    const { question, regex } = questions[i]
    promise = promise.then((answers) =>
      ask(question, regex).then((answer) => [...answers, answer])
    )
  }
  return promise.then((answers) => stop().then(() => answers))
}

let aliases = null

try {
  aliases = require('./.aliases.json')
} catch (err) {}

if (aliases) {
  const blacklist = new Set([
    '.aliases.json',
    'compiled',
    'coverage',
    'dist',
    'node_modules',
    '.git'
  ])

  const walkSync = (dir, callback) => {
    const files = fs.readdirSync(dir)
    files.forEach((file) => {
      if (!blacklist.has(file)) {
        var filepath = path.join(dir, file)
        const stats = fs.statSync(filepath)
        if (stats.isDirectory()) {
          walkSync(filepath, callback)
        } else if (stats.isFile() && !blacklist.has(file)) {
          callback(filepath, stats)
        }
      }
    })
  }

  let files = []
  walkSync(__dirname, (filepath, stats) => {
    if (stats.size < 50000) {
      files.push(filepath)
    }
  })

  const replacers = [[aliases.Year, `${new Date().getFullYear()}`]]
  delete aliases.Year

  const keys = Object.keys(aliases)
  askAll(
    keys.map((alias) => ({
      question: `${alias}${
        alias.slice(0, 7) === 'Author ' ? '' : ' (required)'
      }${descriptions[alias] ? `\n${descriptions[alias]}` : ''}\n? `,
      regex: regexes[alias]
    }))
  ).then((results) => {
    results.forEach((result, i) => {
      replacers.push([aliases[keys[i]], result])
    })

    const regex = replacers.map(([alias]) => `(${alias})`).join('|')
    const replacements = replacers.reduce((o, [alias, replacement]) => {
      o[alias] = replacement
      return o
    }, {})
    const replacer = (match) => replacements[match]

    // replace the aliases in the files
    files.forEach((file, i) => {
      fs.writeFileSync(
        file,
        fs.readFileSync(file, 'utf8').replace(new RegExp(regex, 'g'), replacer)
      )
    })

    // remove .aliases.json
    fs.unlinkSync(path.join(__dirname, '.aliases.json'))

    // remove setup.js
    fs.unlinkSync(path.join(__dirname, 'setup.js'))
  })
}
