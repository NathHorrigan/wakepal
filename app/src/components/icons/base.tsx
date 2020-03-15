import React from 'react'

// Base props that all icons should implement
interface IconProps {
  fill: string
}

// The type that all icons should inherit
type Icon = React.SFC<IconProps>
export default Icon
