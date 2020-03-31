import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Icon } from './base'

const MinusIcon: Icon = ({ fill = 'white', ...props }) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13H6v-2h12v2z"
      fill={fill}
    />
  </Svg>
)

export const Minus = React.memo(MinusIcon)
