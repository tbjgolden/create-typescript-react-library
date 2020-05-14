import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  text: string
}

const C: React.SFC<Props> = ({ text }) => <h1>{text}</h1>

C.propTypes = {
  text: PropTypes.string.isRequired
}

export const id = (prefix = 'id'): string =>
  `${prefix}-${Math.random().toString().slice(2)}`

export default C
