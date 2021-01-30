import fs from 'fs'
import path from 'path'
import { prompt } from 'enquirer'
import fg from 'fast-glob'
import dedent from 'dedent'
import { mutatePackageJSON } from './utils'

const trimObject = (
  obj: Record<string, string | null | undefined>
): Record<string, string> => {
  return Object.entries(obj).reduce((o, [k, v]) => {
    o[k] = ((v || '') as string).trim()
    return o
  }, {} as Record<string, string>)
}

const guessGithubUsername = (): string => {
  // Guess username from nearby package.json files
  const files = fg
    .sync('../../../**/!(node_modules)/*/package.json', {
      dot: true,
      suppressErrors: true
    })
    .filter((x) => !x.includes('node_modules'))
    .slice(0, 50)
    .map((x) => {
      let json = null
      try {
        json = JSON.parse(fs.readFileSync(x, 'utf8'))?.repository?.url
      } catch {}

      if (typeof json === 'string') {
        const matchResults = json.match(usernameRegex)
        if (matchResults) {
          return matchResults[1]
        }
      }

      return null
    })
    .filter(Boolean)
    .reduce((map, _s) => {
      const s = _s as string
      map.set(s, (map.get(s) ?? 0) + 1)
      return map
    }, new Map<string, number>())

  let max = ''
  let maxCount = -1
  for (const [username, count] of files.entries()) {
    if (count > maxCount) {
      maxCount = count
      max = username
    }
  }

  return max
}

const usernameRegex = /github\.com[:\/]([^\/]*)/

const setup = async () => {
  const initialProjectLoc = path.join(__dirname, '..').split(path.sep)
  const initialProjectDir = initialProjectLoc[initialProjectLoc.length - 1]

  const {
    meta: {
      projectName,
      projectDescription,
      githubUsername,
      authorName,
      authorEmail
    }
  } = await prompt<{
    meta: {
      projectName: string
      projectDescription: string
      githubUsername: string
      authorName: string
      authorEmail: string
    }
  }>({
    type: 'snippet',
    name: 'meta',
    message: 'Fill out the fields in package.json',
    template:
      dedent(`{
        "name": "\${projectName${
          initialProjectDir === 'typescript-library-starter'
            ? ''
            : `:${initialProjectDir}`
        }}",
        "description": "\${projectDescription}",
        "homepage": "https://github.com/\${githubUsername:${guessGithubUsername()}}/\${projectName}",
        "author": {
          "name": "\${authorName}",
          "email": "\${authorEmail}",
          "url": "https://github.com/\${githubUsername}"
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/\${githubUsername}/\${projectName}.git"
        }
      }`) + '\n',
    result: ((o: { values: Record<string, string | undefined> }) =>
      trimObject(o.values)) as any,
    validate: ((_: any, state: any): string | boolean => {
      const values = trimObject(state.value.values)
      if (!/^[a-z0-9-~][a-z0-9-._~]*$/.test(values.projectName)) {
        return 'project name is invalid'
      }
      if (
        !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(values.githubUsername)
      ) {
        return 'github username is invalid'
      }
      return true
    }) as any
  })

  const {
    meta: { variableName }
  } = await prompt<{
    meta: { variableName: string }
  }>({
    type: 'snippet',
    name: 'meta',
    message: 'What variable should your library be exported as?',
    template:
      dedent(
        '\n' +
          `
      // Default import name (for basic usage example)
      import \${variableName:${
        projectName
          .split(/[_\-]/g)
          .reduce(
            (s: string, x: string) =>
              `${s}${x.length > 0 ? `${x[0].toUpperCase()}${x.slice(1)}` : ''}`,
            ''
          ) ?? 'VariableName'
      }} from '${projectName}'

      // Window global name (for use in a web browser)
      window.\${variableName}.foo(bar)
      `
      ) + '\n',
    result: ((o: { values: Record<string, string | undefined> }) =>
      trimObject(o.values)) as any,
    validate: ((_: any, state: any): string | boolean => {
      const values = trimObject(state.value.values)

      try {
        new Function(values.variableName, 'var ' + values.variableName)
      } catch {
        return 'variable name is invalid'
      }

      return true
    }) as any
  })

  const year = `${new Date().getFullYear()}`

  const mapper = {
    'gocvmmeyaahgakggbjwmcmif': projectName,
    'Gocvmmeyaahgakggbjwmcmif': variableName,
    'xrdnwftmsmirdshgpfoyocjh': githubUsername,
    'zkhshfmpcvllotfgoigdwyrr': authorName,
    'fnrnhzcp@gohyrqjsyole.jv': authorEmail,
    'rwmgkcxafpdrkuvtfszrfvwv': projectDescription,
    '276768723349764835332642': year
  }

  const { confirm } = await prompt<{ confirm: boolean }>({
    type: 'confirm',
    name: 'confirm',
    message: dedent(
      `Do these look right?

      Project Name:        ${JSON.stringify(projectName)}
      Variable Name:       ${JSON.stringify(variableName)}
      Github Username:     ${JSON.stringify(githubUsername)}
      Author Name:         ${
        authorName ? JSON.stringify(authorName) : '(Field will be removed)'
      }
      Author Email:        ${
        authorEmail ? JSON.stringify(authorEmail) : '(Field will be removed)'
      }
      Project Description: ${JSON.stringify(projectDescription)}

      IMPORTANT: you can only run this once and there's no undo!`
    )
  })

  if (confirm) {
    mutatePackageJSON({})

    const blacklist = new Set([
      'build',
      'compiled',
      'coverage',
      'dist',
      'node_modules',
      '.git'
    ])

    const walkSync = (
      dir: string,
      callback: (filepath: string, stats: fs.Stats) => void
    ): void => {
      const files = fs.readdirSync(dir)
      files.forEach((file) => {
        if (!blacklist.has(file)) {
          const filepath = path.join(dir, file)
          const stats = fs.statSync(filepath)
          if (stats.isDirectory()) {
            walkSync(filepath, callback)
          } else if (stats.isFile() && !blacklist.has(file)) {
            callback(filepath, stats)
          }
        }
      })
    }

    const files: string[] = []
    walkSync(path.join(__dirname, '..'), (filepath, stats) => {
      if (stats.size < 50000) {
        files.push(filepath)
      }
    })

    console.log(files, mapper)
  }
}

if (require.main === module) {
  setup()
}
