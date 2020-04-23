import React, { SFC } from 'react'
import styled from 'styled-components/native'

import WeatherIcons from '@components/icons/weather'
import { WeatherResponse } from '@api/weather/WeatherResponse'
import { colors, fonts } from '@utils/theme'

interface WeatherHeaderProps {
  name: string
  dateLabel: string
  weather: WeatherResponse
}

const WeatherHeader: SFC<WeatherHeaderProps> = ({
  name,
  dateLabel,
  weather,
}) => {
  const WeatherIcon = WeatherIcons[weather.getIcon()]
  return (
    <HeaderContainer>
      <LeftColumn>
        <WelcomeText>
          {getGreeting()}, {name}
        </WelcomeText>
        <DateText>{dateLabel}</DateText>
      </LeftColumn>
      <RightColumn>
        <WeatherIcon />
        <WeatherText>
          <HighlightText>{weather.getTemperature()}° </HighlightText>
          {weather.getSummary()}
        </WeatherText>
      </RightColumn>
    </HeaderContainer>
  )
}

function getGreeting(): string {
  const hourOfDay = new Date().getHours()
  if (hourOfDay < 12) {
    return 'Morning'
  }

  if (hourOfDay < 15) {
    return 'Afternoon'
  }

  if (hourOfDay < 18) {
    return 'Evening'
  }

  if (hourOfDay < 21) {
    return 'Goodnight'
  }

  return 'Hello'
}

const HeaderContainer = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LeftColumn = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RightColumn = styled(LeftColumn)`
  align-items: flex-end;
  justify-content: flex-end;
  top: -1px;
`

const DateText = styled.Text`
  color: black;
  font-family: ${fonts.semiBold};
  font-size: 25px;
`

const WeatherText = styled(DateText)`
  font-size: 15px;
  text-transform: capitalize;
`

const HighlightText = styled.Text`
  color: ${colors.coral};
`

const WelcomeText = styled.Text`
  color: ${colors.grey};
  font-family: ${fonts.medium};
  font-size: 16px;
`

export default WeatherHeader
