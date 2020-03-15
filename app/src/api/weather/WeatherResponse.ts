// Enum that maps the weather description to an icon supported by the UI
export enum WeatherIcon {
  Sunny,
  PartlySunny,
  Cloudy,
  Gloomy,
  Rainy,
  SunnySpells,
  Lightning,
  Snow,
  Fog,
  Moon,
}

// Response that must be returned by any Weather Api controller
export class WeatherResponse {
  private createdAt: number
  private temperature: number
  private icon: WeatherIcon
  private summary: string

  constructor(
    createdAt: number,
    temperature: number,
    summary: string,
    icon: WeatherIcon
  ) {
    this.icon = icon
    this.summary = summary
    this.createdAt = createdAt
    this.temperature = temperature
  }

  getTemperature(): number {
    return this.temperature
  }

  getSummary(): string {
    return this.summary
  }

  getIcon(): WeatherIcon {
    return this.icon
  }
}
