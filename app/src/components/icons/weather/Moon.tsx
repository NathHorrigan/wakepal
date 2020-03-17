import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Icon } from '../base'
import { colors } from '@utils/theme'

const MoonIcon: Icon = ({ fill = colors.grey }) => (
  <Svg width={17} height={19} viewBox="0 0 17 19" fill="none">
    <Path
      d="M0 8.048C0 6.964.21 5.925.641 4.93a7.968 7.968 0 011.714-2.564A8.307 8.307 0 014.919.64 7.768 7.768 0 018.048 0H9.34c.177.044.265.155.265.31l.056.994c.022.708.165 1.382.442 2.023a5.366 5.366 0 002.742 2.797 5.36 5.36 0 001.99.476l.939.077c.177 0 .265.088.265.254v1.117a7.95 7.95 0 01-.652 3.228h-2.266c.563-.818.917-1.758 1.072-2.797-1.857-.387-3.338-1.183-4.455-2.388a7.241 7.241 0 01-1.934-4.234 5.645 5.645 0 00-2.941.995 6.442 6.442 0 00-2.067 2.3 6.196 6.196 0 00-.73 2.907c0 1.183.31 2.255.918 3.228H.663A8.165 8.165 0 010 8.047zm.276 6.666c0-.288.11-.542.332-.763.199-.2.453-.299.752-.299h3.56c.12 0 .22.023.309.089l2.598 2.454 2.642-2.465a.551.551 0 01.32-.089h3.648c.299 0 .553.1.763.31.21.21.32.464.32.752 0 .298-.11.552-.32.762-.21.21-.464.32-.763.32h-2.962l-3.46 3.14c-.133.1-.266.1-.376 0l-3.405-3.14H1.36c-.299 0-.553-.11-.763-.32a1.002 1.002 0 01-.32-.751z"
      fill={fill}
    />
  </Svg>
)

// Exported as WeatherIcon to allow easier importing
export const Moon: Icon = React.memo(MoonIcon)
export default Moon
