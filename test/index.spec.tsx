import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import C from '../src/index'

describe('Component', () => {
  it('should render correctly', async () => {
    render(<C text="Text" />)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  })
})
