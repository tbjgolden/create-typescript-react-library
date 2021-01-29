import fs from 'fs'
import path from 'path'
import dedent from 'dedent'
import { PersistentState } from './utils'

const run = async (name?: string) => {
  if (typeof name !== 'string' || !/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(name)) {
    throw new Error('Name must be a PascalCase string')
  }

  const state = new PersistentState()
  if (!state.get().hasAddedReact && 0) {
    throw new Error('Need to add React first')
  }

  // Check if already exists
  const srcDir = path.join(__dirname, '../src')
  const components = fs.readdirSync(srcDir, {
    withFileTypes: true
  })
  for (const component of components) {
    if (component.name === name) {
      throw new Error(
        `${
          component.isDirectory() ? 'Component' : 'File'
        } with that name already exists`
      )
    }
  }

  const newDir = path.join(srcDir, name)
  fs.mkdirSync(newDir)
  fs.writeFileSync(
    path.join(newDir, 'index.tsx'),
    dedent`
    import React from 'react'

    const ${name} = ({ text }: { text: string }): JSX.Element => <h1>{text}</h1>

    export default ${name}
    ` + '\n'
  )
  fs.writeFileSync(
    path.join(newDir, 'index.spec.tsx'),
    dedent`
    import React from 'react'
    import { render, waitFor, screen } from '@testing-library/react'
    import ${name} from '.'

    it('should render correctly', async () => {
      render(<${name} text="hello there" />)
      await waitFor(() => screen.getByRole('heading'))
      expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    })
    ` + '\n'
  )
  fs.writeFileSync(
    path.join(newDir, 'index.stories.tsx'),
    dedent`
    import React from 'react'
    import { withKnobs, text } from '@storybook/addon-knobs'
    import ${name} from '.'

    export default {
      component: ${name},
      title: '${name}',
      decorators: [withKnobs]
    }

    export const Default = (): JSX.Element => {
      const textValue = text('Name', 'Example Text')
      return <${name} text={textValue} />
    }
    ` + '\n'
  )
}

if (require.main === module) {
  run(...process.argv.slice(2))
}