import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  text: string
}

const C: React.SFC<Props> = ({ text }) => <h1>{text}</h1>

C.propTypes = {
  text: PropTypes.string.isRequired,
}

export default C
