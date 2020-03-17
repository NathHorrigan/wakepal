import React from 'react'
import { storiesOf } from '@storybook/react-native'

import CenterView from './CenterView'
import WeatherHeader from '@components/WeatherHeader'
import { WeatherResponse, WeatherIcon } from '@api/weather/WeatherResponse'

const exampleWeather = new WeatherResponse(
  Date.now,
  6,
  'Cloudy',
  WeatherIcon.PartlySunny
)

storiesOf('Sleep', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Weather Header', () => (
    <WeatherHeader name="Nathan" dateLabel="Today" weather={exampleWeather} />
  ))
