import React from 'react'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'
import Icon from './base'

const Plus: Icon = ({ fill = 'white' }) => (
  <Svg width={24} height={24} fill="none">
    <G clipPath="url(#prefix__clip0)">
      <Path
        d="M12.29 2.81c5.225 0 9.476 4.25 9.476 9.476 0 5.226-4.251 9.477-9.477 9.477-5.225 0-9.477-4.251-9.477-9.477 0-5.225 4.252-9.477 9.477-9.477zm0-1.896C6.008.914.916 6.006.916 12.286s5.092 11.372 11.372 11.372 11.373-5.092 11.373-11.372S18.57.914 12.289.914zm5.685 12.32h-4.738v4.738h-1.895v-4.738H6.603v-1.896h4.739V6.6h1.895v4.739h4.738v1.895z"
        fill={fill}
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path fill={fill} d="M.917.914h22.745v22.744H.917z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const MemoPlus = React.memo(Plus)
export default MemoPlus
