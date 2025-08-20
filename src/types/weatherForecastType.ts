export interface ForecastDayValues {
  temperatureMax: number;
  temperatureMin: number;
  evapotranspirationAvg: number;
  precipitationProbabilityAvg: number;
  windSpeedAvg: number;
  humidityAvg: number;
  cloudCoverAvg: number;
  weatherCodeMax: number;
  visibilityAvg: number;
}

export interface ForecastDay {
  time: string;
  values: ForecastDayValues;
}

export interface ForecastWeatherData {
  timelines: {
    daily: ForecastDay[];
  };
}