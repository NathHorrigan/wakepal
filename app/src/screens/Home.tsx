import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import styled from 'styled-components/native'

import WeatherHeader from '@components/WeatherHeader'
import WeatherAPI, { WeatherResponse } from '@api/weather/OpenWeatherMap'
import { logout } from '@redux/actions'

const HomeScreen = () => {
  // Global State
  const dispatch = useDispatch()
  const profile = useSelector(state => state.authentication.userSession.profile)
  // Local State
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse>(null)

  // Startup Function
  useEffect(() => {
    // Load the current weather and save to local cache
    WeatherAPI.getClient('74978edb5b0e5b1fc3133754c33e99e4')
      .getCurrentWeather()
      .then((currentWeather: WeatherResponse) =>
        setCurrentWeather(currentWeather)
      )
  }, [])

  return (
    <Container>
      {currentWeather && (
        <WeatherHeader
          name={profile.name}
          dateLabel={format(Date.now(), 'DD/MM/YYYY')}
          weather={currentWeather}
        />
      )}
    </Container>
  )
}

export default HomeScreen

const Container = styled.View`
  display: flex;
  width: 100%;
  padding-top: 60px;
`

const Hello = styled.Text``
