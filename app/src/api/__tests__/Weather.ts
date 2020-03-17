import WeatherApi from '@api/weather/OpenWeatherMap'

test('Weather API: Returns serialized data', async () => {
  const location = await WeatherApi.getClient(
    '74978edb5b0e5b1fc3133754c33e99e4'
  ).getCurrentWeather()

  // We can't test the data so testing the types instead
  expect(typeof location.createdAt).toBe('number')
  expect(typeof location.temperature).toBe('number')
  expect(typeof location.summary).toBe('string')
})
