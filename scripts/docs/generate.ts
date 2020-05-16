import TypeDoc from 'typedoc'

const app = new TypeDoc.Application()

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader())
app.options.addReader(new TypeDoc.TypeDocReader())

app.bootstrap({
  mode: 'modules',
  logger: 'none',
  target: 'ES5',
  module: 'CommonJS'
})

const project = app.convert(app.expandInputFiles(['src']))

if (project) {
  // Project may not have converted correctly
  const outputDir = 'docs'

  // Rendered docs
  app.generateDocs(project, outputDir)
  // Alternatively generate JSON output
  app.generateJson(project, outputDir + '/documentation.json')
}
