import {
  PersistentState,
  addScriptDependency,
  installDependencies
} from './utils'

const run = async () => {
  const state = new PersistentState()
  if (state.get().hasAddedReact) {
    return console.log('Already added React')
  }

  addScriptDependency(
    'https://unpkg.com/react/umd/react.production.min.js',
    'https://unpkg.com/react-dom/umd/react-dom.production.min.js'
  )

  await installDependencies(['react', 'react-dom'], 'peer')

  await installDependencies(
    [
      '@babel/preset-react',
      '@storybook/react',
      '@testing-library/react',
      '@types/react',
      '@types/react-dom',
      '@types/testing-library__react',
      'babel-preset-react-app',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'react',
      'react-dom',
      'react-test-renderer'
    ],
    'dev'
  )

  state.set({ hasAddedReact: true })
}

run()
