import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Icon } from './base'
import { colors } from '@utils/theme'

interface ChevronProps {
  fill?: string
  height?: number
  width?: number
}

const ChevronIcon: React.SFC<ChevronProps> = ({ height, width, fill }) => {
  return (
    <Svg
      height={height ?? 10}
      width={width ?? 10}
      viewBox="0 0 185.343 185.343"
    >
      <Path
        d="M51.707 185.343a10.692 10.692 0 01-7.593-3.149 10.724 10.724 0 010-15.175l74.352-74.347L44.114 18.32c-4.194-4.194-4.194-10.987 0-15.175 4.194-4.194 10.987-4.194 15.18 0l81.934 81.934c4.194 4.194 4.194 10.987 0 15.175l-81.934 81.939a10.678 10.678 0 01-7.587 3.15z"
        fill={fill ?? colors.coral}
      />
    </Svg>
  )
}

export const Chevron = React.memo(ChevronIcon)
