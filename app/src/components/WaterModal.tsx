import React from 'react'
import { Dimensions, Keyboard } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import Svg, { Path } from 'react-native-svg'
import { Water, Plus, Minus, Cross } from './icons'

import { ButtonProps } from '@components/ActionButton'
import { fonts } from '@utils/theme'

interface WaterModalProps {
  visible: boolean
  onClose: Function
  value: number
  goalValue: number
  unit: string
  updateValue: Function
}

const WaterModal: React.SFC<WaterModalProps> = ({
  visible,
  onClose,
  value,
  goalValue,
  unit,
  updateValue,
}) => {
  const label =
    value === 0
      ? 'No water yet!'
      : value === goalValue
      ? 'Water goal met!'
      : value > goalValue
      ? `${value - goalValue} Extra ${unit}`
      : `${goalValue - value} ${unit} to go...`

  return (
    <StyledModal
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      avoidKeyboard
    >
      <ModalContent>
        <WaterWaveShape />
        <CrossButton onPress={onClose}>
          <Cross />
        </CrossButton>

        <WaterLabel>{label}</WaterLabel>

        <WaterIcon>
          <Water width={80} height={80} />
        </WaterIcon>
        <WaterControlRow value={value} unit={unit} updateValue={updateValue} />
      </ModalContent>
    </StyledModal>
  )
}

export const WaterControlRow = ({
  color = 'white',
  value,
  unit,
  updateValue,
  increment = 1,
}) => (
  <ControlRow>
    <IconButton
      onPress={() => (value !== 0 ? updateValue(value - increment) : null)}
    >
      <Minus fill={color} />
    </IconButton>
    <ValueText
      color={color}
      maxLength={2}
      onSubmit={Keyboard.dismiss}
      returnKeyType="done"
      keyboardType={'numeric'}
      onChangeText={newValue => updateValue(newValue)}
    >
      {value}
    </ValueText>
    <UnitText color={color}>{unit}</UnitText>
    <IconButton onPress={() => updateValue(value + increment)}>
      <Plus fill={color} />
    </IconButton>
  </ControlRow>
)

const StyledModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`

const waveWidth = Dimensions.get('window').width + 4
const waveHeight = 428 * (waveWidth / 1440)
const WaterWaveShape = () => (
  <WaterWaveBackground>
    <Svg width={waveWidth} height={waveHeight} viewBox="0 0 1440 428.191">
      <Path
        d="M1439.849 143.157A149.718 149.718 0 001290.28 0H149.72A149.718 149.718 0 00.151 143.157H0v101.786l40 5.678c40 6.107 120 16.822 200 51.429 80 33.964 160 91.82 240 114.32s160 11.786 240-22.821c80-33.964 160-91.821 240-102.857 80-11.464 160 22.822 240 39.964s160 17.144 200 17.144h40V143.156z"
        fill="#09f"
      />
    </Svg>
  </WaterWaveBackground>
)

const ModalContent = styled.View`
  position: relative;
  height: ${waveWidth}px;
  width: 100%;
  background: #62b0e8;
  border-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding-top: ${waveHeight}px;
`

const WaterWaveBackground = styled.View`
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 0px;
  left: -2px;
  right: -2px;
`

const CrossButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2;
`

const WaterIcon = styled.View`
  margin: 10px 20px;
`

const WaterLabel = styled.Text`
  position: absolute;
  left: 90px;
  top: ${waveHeight + 60}px;

  font-size: 25px;
  color: rgba(255, 255, 255, 0.9);
  font-family: ${fonts.semiBold};
`

const ControlRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  margin-top: 40px;
`

const ValueText = styled.TextInput<ButtonProps>`
  color: ${props => props.color};
  font-size: 35px;
  font-family: ${fonts.bold};
`

const UnitText = styled.Text<ButtonProps>`
  opacity: 0.6;
  color: ${props => props.color};
  font-family: ${fonts.semiBold};
  font-size: 20px;
  margin-top: 10px;
  margin-left: 5px;
`

const IconButton = styled.TouchableOpacity`
  margin: 0 20px;
  padding: 20px;
`

export default WaterModal
