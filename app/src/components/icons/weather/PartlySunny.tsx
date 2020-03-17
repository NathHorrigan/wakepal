import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Icon } from '../base'
import { colors } from '@utils/theme'

const PartlySunnyIcon: Icon = ({ fill = colors.grey }) => (
  <Svg width={25} height={19} viewBox="0 0 25 19" fill="none">
    <Path
      d="M0 14.509c0 .816.2 1.57.599 2.259.4.69.944 1.234 1.633 1.633.69.4 1.434.599 2.241.599H14.3c.807 0 1.56-.2 2.25-.599.69-.4 1.243-.944 1.642-1.633.4-.69.608-1.443.608-2.26 0-.598-.127-1.206-.38-1.814.689-.835 1.034-1.842 1.034-2.994 0-.645-.127-1.262-.372-1.851a4.635 4.635 0 00-1.017-1.516 4.635 4.635 0 00-1.515-1.016 4.622 4.622 0 00-1.85-.372c-1.344 0-2.514.526-3.521 1.579-.7-.4-1.516-.599-2.45-.599-1.28 0-2.405.4-3.385 1.189a5.262 5.262 0 00-1.887 3.04 4.308 4.308 0 00-2.486 1.569A4.375 4.375 0 000 14.509zm1.552 0c0-.763.254-1.416.762-1.97.508-.553 1.143-.87 1.905-.961l.454-.027c.109 0 .172-.055.172-.164l.064-.49c.127-.98.553-1.805 1.28-2.459a3.663 3.663 0 012.549-.989c.998 0 1.869.336 2.604.998a3.62 3.62 0 011.243 2.46l.063.526c.019.1.082.154.191.154h1.46c.8 0 1.489.29 2.07.871.58.58.87 1.261.87 2.06a2.89 2.89 0 01-.861 2.105c-.572.58-1.27.87-2.069.87H4.473c-.798 0-1.479-.29-2.06-.88-.571-.59-.861-1.288-.861-2.104zM7.63 3.375c0 .218.072.409.218.572l.598.58c.227.173.418.246.581.228.19 0 .354-.082.5-.236a.796.796 0 00.217-.563c0-.218-.082-.4-.236-.535l-.535-.6a.806.806 0 00-.554-.217.766.766 0 00-.562.227.713.713 0 00-.227.544zm4.845 4.02a3.085 3.085 0 012.223-.907c.898 0 1.66.308 2.287.934.626.626.943 1.38.943 2.278 0 .562-.154 1.125-.462 1.67-.88-.872-1.933-1.307-3.167-1.307h-.29c-.227-.99-.735-1.879-1.534-2.668zm1.48-4.79c0 .235.072.416.208.562.136.145.317.208.535.208a.782.782 0 00.563-.208c.145-.146.208-.327.208-.563V.744a.718.718 0 00-.217-.535C15.107.064 14.926 0 14.699 0a.747.747 0 00-.535.209c-.145.136-.209.317-.209.535v1.86zm5.008 2.077c0 .236.063.417.2.563.19.145.38.217.562.217.163 0 .345-.072.535-.217l1.298-1.298a.84.84 0 00.217-.58c0-.218-.072-.4-.217-.545a.732.732 0 00-.536-.218.684.684 0 00-.526.218l-1.334 1.297a.872.872 0 00-.2.563zm.716 10.743c0 .218.073.408.227.572l.59.571a.684.684 0 00.526.218c.218 0 .4-.073.545-.227a.78.78 0 00.218-.562c0-.2-.073-.381-.218-.527l-.59-.59a.706.706 0 00-.517-.217c-.218 0-.4.072-.545.218a.72.72 0 00-.236.544zM21.014 9.7c0 .208.082.38.236.526a.76.76 0 00.554.218h1.85a.74.74 0 00.527-.209c.145-.136.209-.318.209-.535 0-.218-.073-.4-.209-.545a.706.706 0 00-.526-.227h-1.851c-.218 0-.4.073-.554.227a.716.716 0 00-.236.545z"
      fill={fill}
    />
  </Svg>
)

// Exported as WeatherIcon to allow easier importing
export const PartlySunny: Icon = React.memo(PartlySunnyIcon)
export default PartlySunny
