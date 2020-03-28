import React from 'react'
import { storiesOf } from '@storybook/react-native'

import CenterView from './CenterView'
import WeatherHeader from '@components/WeatherHeader'
import SleepGraph from '@components/SleepGraph'
import { SleepStage } from '@api/sleep/SleepRecording'
import { WeatherResponse, WeatherIcon } from '@api/weather/WeatherResponse'

const exampleWeather = new WeatherResponse(
  Date.now,
  6,
  'cloudy',
  WeatherIcon.PartlySunny
)

storiesOf('Sleep', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Weather Header', () => (
    <WeatherHeader name="Nathan" dateLabel="Today" weather={exampleWeather} />
  ))
  .add('Sleep Graph', () => (
    <SleepGraph
      segments={[
        {
          startTime: new Date(1585249742 * 1000),
          endTime: new Date(1585256952 * 1000),
          stage: SleepStage.Awake,
        },
        {
          startTime: new Date(1585256952 * 1000),
          endTime: new Date(1585264222 * 1000),
          stage: SleepStage.Light,
        },
        {
          startTime: new Date(1585264222 * 1000),
          endTime: new Date(1585278647 * 1000),
          stage: SleepStage.Rem,
        },
        {
          startTime: new Date(1585278647 * 1000),
          endTime: new Date(1585297232 * 1000),
          stage: SleepStage.Deep,
        },
      ]}
    />
  ))
