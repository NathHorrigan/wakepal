// Enum that maps the weather description to an icon supported by the UI
export enum WeatherIcon {
  Sunny = 'Sunny',
  PartlySunny = 'PartlySunny',
  Cloudy = 'Cloudy',
  Gloomy = 'Gloomy',
  Rainy = 'Rainy',
  SunnySpells = 'SunnySpells',
  Lightning = 'Lightning',
  Snow = 'Snow',
  Fog = 'Fog',
  Moon = 'Moon',
}

// Response that must be returned by any Weather Api controller
export class WeatherResponse {
  public createdAt: number
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
