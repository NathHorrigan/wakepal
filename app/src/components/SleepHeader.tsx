import React, { SFC } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { SleepStage, SleepSpan } from '@api/sleep/SleepRecording'
import { colors, fonts } from '@utils/theme'

const SleepHeader = () => {
  return (
    <HeaderConatiner>
      <HeaderTitle>Sleep Diary</HeaderTitle>
    </HeaderConatiner>
  )
}

const HeaderConatiner = styled.View`
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const HeaderTitle = styled.Text`
  font-size: 24px;
  color: #4e4e4e;
  font-family: ${fonts.semiBold};
`

export default SleepHeader
