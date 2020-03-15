import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'
import Icon from './base'

const Watch: Icon = ({ fill = 'white' }) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
    <G clipPath="url(#prefix__clip0)">
      <Path
        d="M14.625 14.625h3.618v2.412h-6.03V9.8h2.412v4.825zm10.855-1.207h-1.29a9.974 9.974 0 00-3.193-6.142c-1.548-1.407-1.481-2.71-2.239-7.125H9.285c-.757 4.414-.691 5.718-2.239 7.125A9.96 9.96 0 007.05 22.05c1.544 1.404 1.486 2.734 2.235 7.048h9.473c.75-4.314.691-5.644 2.236-7.048a9.976 9.976 0 003.209-6.22h1.277v-2.412zm-11.459 9.047a7.841 7.841 0 01-7.84-7.84 7.841 7.841 0 017.84-7.84 7.841 7.841 0 017.84 7.84 7.841 7.841 0 01-7.84 7.84z"
        fill={fill}
        fillOpacity={0.9}
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path fill={fill} d="M.151.151h28.948v28.948H.151z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const MemoWatch = React.memo(Watch)
export default MemoWatch
