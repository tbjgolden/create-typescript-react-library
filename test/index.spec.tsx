import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import C, { id } from '../src/index'

describe('Component', () => {
  it('should render correctly', async () => {
    render(<C text="hello there" />)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  })

  it('should generate id correctly with default', async () => {
    expect(/^lolz-\d{5,}$/.test(id('lolz'))).toBe(true)
  })

  it('should generate id correctly without default', async () => {
    expect(/^id-\d{5,}$/.test(id())).toBe(true)
  })
})
