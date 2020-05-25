import React from 'react'

interface Props {
  text: string
}

const C: React.FunctionComponent<Props> = ({ text }) => <h1>{text}</h1>

export const id = (prefix = 'id'): string =>
  `${prefix}-${Math.random().toString().slice(2)}`

export default C
