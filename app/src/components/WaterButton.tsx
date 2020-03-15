import React, { SFC } from 'react'
import styled from 'styled-components/native'
import Svg, { Path } from 'react-native-svg'

import { Water, Plus } from '@components/icons'
import { colors } from '@utils/theme'
import {
  WideStyledButton as BaseStyledButton,
  ButtonText as BaseButtonText,
} from './ActionButton'

interface WaterButtonProps {
  label: string
  onPress(): null
}

const WaterButton: SFC<WaterButtonProps> = ({ label, onPress }) => {
  return (
    <WaterStyledButton
      activeOpacity={0.85}
      onPress={onPress}
      color={colors.darkBlue}
    >
      <PlusIcon>
        <Plus />
      </PlusIcon>
      <WaterIcon />
      <ButtonText>{label}</ButtonText>
      <WaterWaveShape />
    </WaterStyledButton>
  )
}

const WaterWaveShape = () => (
  <WaterWaveBackground>
    <Svg width={220} height={85} fill="none">
      <Path
        d="M0 48.418c0-5.523 4.477-10 10-10h200c5.523 0 10 4.477 10 10v26.229c0 5.522-4.477 10-10 10H10c-5.523 0-10-4.478-10-10V48.418z"
        fill="#62B0E8"
      />
      <Path
        d="M0 11.735l9.167-1.962C18.333 7.885 36.667 3.851 55 5.868s36.667 9.718 55 9.773c18.333-.055 36.667-7.756 55-11.735C183.333 0 201.667 0 210.833 0H220v46.941H0V11.735z"
        fill="#62B0E8"
      />
    </Svg>
  </WaterWaveBackground>
)

const WaterStyledButton = styled(BaseStyledButton)`
  position: relative;
  background: #2680c2;
`

const ButtonText = styled(BaseButtonText)`
  position: absolute;
  left: 52px;
  bottom: 10px;
`

const WaterIcon = styled(Water)`
  position: absolute;
  left: 10px;
  bottom: 15px;
`

const PlusIcon = styled.View`
  position: absolute;
  top: 30px;
  right: 10px;
`

const WaterWaveBackground = styled.View`
  position: absolute;
  z-index: -1;
  bottom: -1px;
  left: 0;
`

export default WaterButton
