import React, { SFC } from 'react'
import styled from 'styled-components/native'

import { WideStyledButton, ButtonText } from '@components/ActionButton'
import { Fitbit } from '@components/icons'
import { colors } from '@utils/theme'

export interface FitbitButtonProps {
  testId?: string
  onPress(): null
}

const FitbitButton: SFC<FitbitButtonProps> = ({
  onPress,
  testId,
  ...props
}) => {
  return (
    <Button
      activeOpacity={0.85}
      onPress={onPress}
      color={colors.fitbit}
      testId={testId}
      {...props}
    >
      <IconContainer>
        <Fitbit />
      </IconContainer>
      <ButtonText>Use Fitbit Smartband</ButtonText>
    </Button>
  )
}

export const Button = styled(WideStyledButton)`
  flex-direction: row;
  width: 300px;
  height: 50px;
  color: white;
  align-items: center;
  justify-content: center;
  padding-bottom: 0px;
  border-radius: 5px;
  margin: 0 auto;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.23);
`

const IconContainer = styled.View`
  margin-right: 10px;
`

export default FitbitButton
