export interface WeatherRealtime    {
    data: {
        time: string;
        values: {
            altimeterSetting: number;
            cloudBase: number | null;
            cloudCeiling: number | null;
            cloudCover: number;
            dewPoint: number;
            freezingRainIntensity: number;
            humidity: number;
            precipitationProbability: number;
            pressureSeaLevel: number;
            pressureSurfaceLevel: number;
            rainIntensity: number;
            sleetIntensity: number;
            snowIntensity: number;
            temperature: number;
            temperatureApparent: number;
            uvHealthConcern: number;
            uvIndex: number;
            visibility: number;
            weatherCode: number;
            windDirection: number;
            windGust: number;
            windSpeed: number;
        }
    }
    location: {
        lat: number;
        lon: number;
    }
}