import React from 'react'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'
import { Icon } from './base'

const CrossIcon: Icon = ({ fill = 'white', ...props }) => (
  <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
    <G clipPath="url(#prefix__clip0)">
      <Path
        d="M15 12.617l-5.197-5.13 5.125-5.176L12.618 0 7.484 5.199 2.291.072 0 2.363l5.2 5.15L.073 12.71 2.363 15l5.148-5.199 5.178 5.127L15 12.618z"
        fill={fill}
        fillOpacity={0.95}
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path fill={fill} d="M0 0h15v15H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export const Cross = React.memo(CrossIcon)
