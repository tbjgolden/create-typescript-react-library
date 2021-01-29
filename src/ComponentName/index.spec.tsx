import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import ComponentName from '.'

it('should render correctly', async () => {
  render(<ComponentName text="hello there" />)
  await waitFor(() => screen.getByRole('heading'))
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
})
