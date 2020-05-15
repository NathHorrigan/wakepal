import React, { SFC } from 'react'
import styled from 'styled-components/native'

import { Icon as SVGIcon } from '@components/icons/base'
import { colors, fonts } from '@utils/theme'

export interface ActionButtonProps {
  icon?: SVGIcon
  label: string
  wide?: boolean
  disabled?: boolean
  color?: string
  onPress(): null
}

const ActionButton: SFC<ActionButtonProps> = ({
  icon: Icon,
  label,
  wide,
  color = colors.coral,
  onPress = () => null,
  disabled,
  ...props
}) => {
  const ButtonContainer = wide ? WideStyledButton : StyledButton

  return (
    <ButtonContainer
      disabled={disabled}
      activeOpacity={0.85}
      onPress={onPress}
      color={color}
      {...props}
    >
      <IconContainer>{Icon && <Icon />}</IconContainer>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  )
}

export interface ButtonProps {
  color?: string
  width?: Number
}

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
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
  opacity: ${props => (props.disabled ? 0.2 : 1)};
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
