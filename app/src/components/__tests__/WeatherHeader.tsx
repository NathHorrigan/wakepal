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

const RealDate = Date
const mockDate = () => {
  Date = class extends RealDate {
    constructor() {
      super()
      return new RealDate('2020-03-26T13:51:51+0000')
    }
  }
}

it('renders correctly', () => {
  const dateNowFn = Date.now
  mockDate()
  const tree = renderer
    .create(
      <WeatherHeader name="Nathan" dateLabel="Today" weather={exampleWeather} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
  Date.now = dateNowFn
})
