import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Icon } from './base'

const WaterIcon: Icon = ({ fill = 'white', ...props }) => (
  <Svg width={44} height={48} viewBox="0 0 44 48" fill="none" {...props}>
    <Path
      d="M19.926 12.175c-7.238 10.697-11.89 17.386-11.89 23.89 0 6.507 5.32 11.778 11.89 11.778s11.89-5.27 11.89-11.778c0-6.504-4.651-13.193-11.89-23.89zm-.041 7.607c.697 1.078 1.527 2.955 1.527 4.935 0 5.807-5.944 6.76-5.944 3.224 0-2.426 2.954-6.006 4.416-8.159zm-4.754-7.587C13.916 8.947 11.414 5.275 8.037.286 3.21 7.418.11 11.878.11 16.212c0 4.218 3.358 7.63 7.573 7.817 1.88-3.517 4.429-7.37 7.447-11.834zM5.065 10.798c0-1.617 1.97-4.004 2.944-5.44.466.718 1.019 1.97 1.019 3.29 0 3.872-3.963 4.506-3.963 2.15zm30.714-4.567c-3.381 4.995-5.886 8.671-7.1 11.92 2.804 4.364 4.886 8.129 6.051 11.755 5.002.656 8.975-3.188 8.975-7.75 0-4.333-3.1-8.794-7.926-15.925zm-2.973 10.512c0-1.617 1.97-4.005 2.945-5.44.465.718 1.018 1.97 1.018 3.29 0 3.872-3.963 4.506-3.963 2.15z"
      fill={fill}
      fillOpacity={0.9}
    />
  </Svg>
)

export const Water = React.memo(WaterIcon)
