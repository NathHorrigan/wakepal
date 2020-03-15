import { WeatherStation } from '@api/weather/WeatherStation'
import { WeatherResponse, WeatherIcon } from '@api/weather/WeatherResponse'

interface Location {
  latitude: number
  longitude: number
}

class OpenWeatherMap implements WeatherStation {
  private static API_KEY: string
  private static client: OpenWeatherMap

  static getClient(key: string): OpenWeatherMap {
    OpenWeatherMap.API_KEY = key
    if (!OpenWeatherMap.client) {
      OpenWeatherMap.client = new OpenWeatherMap()
    }

    return OpenWeatherMap.client
  }

  private getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position: Location) => resolve(position),
        (error: Error) => reject(error),
        { enableHighAccuracy: false, timeout: 1000 }
      )
    })
  }

  private createApiUrl(location: Location) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&APPID=${OpenWeatherMap.API_KEY}&units=metric`
  }

  public async getCurrentWeather(): Promise<WeatherResponse> {
    try {
      const currentLocation = await this.getCurrentLocation()
      const response = await fetch(this.createApiUrl(currentLocation))
      const data = await response.json()

      return new WeatherResponse(
        // Date created at
        Date.now(),
        // Temperature (in Celcius)
        data.main.temp,
        // Summary of weather
        data.weather[0].description,
        // Icon to be used for the UI
        this.getIcon(data.weather.icon)
      )
    } catch (e) {
      console.error(e)
    }
  }

  private getIcon(iconCode: string): WeatherIcon {
    switch (iconCode) {
      case '01d':
        return WeatherIcon.Sunny
      case '02d':
        return WeatherIcon.PartlySunny
      case '03d':
        return WeatherIcon.Cloudy
      case '04d':
        return WeatherIcon.Gloomy
      case '09d':
        return WeatherIcon.Showers
      case '10d':
        return WeatherIcon.Rain
      case '11d':
        return WeatherIcon.Lightning
      case '13d':
        return WeatherIcon.Snow
      case '50d':
        return WeatherIcon.Fog
      default:
        return WeatherIcon.Moon
    }
  }
}

export default OpenWeatherMap
