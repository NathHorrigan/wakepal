import React, { SFC } from 'react'
import styled from 'styled-components/native'

import WeatherIcons from '@components/icons/weather'
import { Chevron } from '@components/icons'
import { WeatherResponse } from '@api/weather/WeatherResponse'
import { colors, fonts } from '@utils/theme'

interface WeatherHeaderProps {
  name: string
  dateLabel: string
  weather: WeatherResponse
  showBackLink: boolean
  onBackPress: Function
}

const WeatherHeader: SFC<WeatherHeaderProps> = ({
  name,
  dateLabel,
  weather,
  showBackLink = false,
  onBackPress,
}) => {
  const backToTodayCallback = showBackLink && onBackPress
  const WeatherIcon = weather && WeatherIcons[weather.getIcon()]
  return (
    <HeaderContainer>
      <LeftColumn>
        <WelcomeText>
          {getGreeting()}, {name}
        </WelcomeText>
        <DateText>{dateLabel}</DateText>
      </LeftColumn>
      {/* To allow of lazy loading of weather data */}
      {weather && !showBackLink && (
        <RightColumn>
          <WeatherIcon />
          <WeatherText>
            <HighlightText>{weather.getTemperature()}° </HighlightText>
            {weather.getSummary()}
          </WeatherText>
        </RightColumn>
      )}
      {/* Allow clicking to go back to today focus */}
      {backToTodayCallback && (
        <BackButton onPress={backToTodayCallback}>
          <BackText>Back to Today</BackText>
          <Chevron />
        </BackButton>
      )}
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

  if (hourOfDay > 17 && hourOfDay < 21) {
    return 'Evening'
  }

  if (hourOfDay > 21) {
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

const BackButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 25px;
`

const BackText = styled.Text`
  color: ${colors.coral};
  font-family: ${fonts.semiBold};
  font-size: 15px;
  padding-right: 3px;
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
