import React, { SFC } from 'react'
import styled from 'styled-components/native'
import { getSleepSummary } from '@components/SleepGraph'
import { SleepSpan } from '@api/sleep/SleepRecording'
import { colors, fonts } from '@utils/theme'

export interface ActionButtonProps {
  date: string
  segments: SleepSpan
}

const SleepSummaryButton: SFC<ActionButtonProps> = ({
  date,
  segments,
  ...props
}) => {
  const { efficiency } = getSleepSummary(segments)
  return (
    <ButtonContainer activeOpacity={0.85} onPress={() => null} {...props}>
      <DateContainer>
        <DateText>{date}</DateText>
      </DateContainer>

      <SleepMeter>
        <SleepSegment width={`${100 - efficiency}%`} color={colors.paleGreen} />
        <SleepSegment width={`${efficiency}%`} color={colors.paleBlue} />
      </SleepMeter>
    </ButtonContainer>
  )
}

export const ButtonContainer = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  background-color: ${colors.coral};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const DateContainer = styled.View`
  color: white;
  margin-top: 20px;
`

const DateText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: ${fonts.bold};
`

const SleepMeter = styled.View`
  display: flex;
  flex-direction: row;
`

const SleepSegment = styled.View`
  height: 5px;
  background: ${props => props.color};
  width: ${props => props.width};
`

export default SleepSummaryButton
