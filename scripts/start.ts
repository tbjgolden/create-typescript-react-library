import { PersistentState } from './utils'

const state = new PersistentState()

if (state.get().hasAddedReact) {
  console.log('Starting storybook...')
  require('@storybook/react/dist/server')
} else {
}
