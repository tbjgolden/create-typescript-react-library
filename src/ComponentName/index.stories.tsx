import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import ComponentName from '.'

export default {
  component: ComponentName,
  title: 'ComponentName',
  decorators: [withKnobs]
}

export const Default = (): JSX.Element => {
  const textValue = text('Name', 'Example Text')
  return <ComponentName text={textValue} />
}
