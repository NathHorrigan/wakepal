import React, { SFC } from 'react'
import styled from 'styled-components/native'

import { colors, fonts } from '@utils/theme'

export interface ActionButtonProps {
  icon: React.SFC
  label: string
  wide?: boolean
  color?: string
  onPress(): null
}

const ActionButton: SFC<ActionButtonProps> = ({
  icon: Icon,
  label,
  wide,
  color = colors.coral,
  onPress,
}) => {
  const ButtonContainer = wide ? WideStyledButton : StyledButton

  return (
    <ButtonContainer activeOpacity={0.85} onPress={onPress} color={color}>
      <IconContainer>
        <Icon />
      </IconContainer>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  )
}

export const StyledButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  width: 100px;
  height: 100px;
  color: white;
  background: ${props => props.color};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding-bottom: 15px;
  overflow: hidden;
`

export const WideStyledButton = styled(StyledButton)`
  width: 220px;
  align-items: flex-start;
  padding-left: 15px;
  padding-bottom: 10px;
`

export const ButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-family: ${fonts.semiBold};
`

const IconContainer = styled.View`
  margin-bottom: 5px;
`

export default ActionButton
