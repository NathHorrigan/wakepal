import React from 'react'
import WeatherHeader from '../WeatherHeader'
import renderer from 'react-test-renderer'
import { WeatherResponse, WeatherIcon } from '@api/weather/WeatherResponse'

export const exampleWeather = new WeatherResponse(
  Date.now,
  6,
  'cloudy',
  WeatherIcon.PartlySunny
)

it('renders correctly', () => {
  const tree = renderer
    .create(
      <WeatherHeader name="Nathan" dateLabel="Today" weather={exampleWeather} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
