export type WeatherIconType = 'sun' | 'partlyCloud' | 'cloud' | 'rain' | 'fog';

export function getWeatherIcon({
    weatherCode,
    cloudCover,
    precipitationProbability,
    visibility,
} : {
    weatherCode: number;
    cloudCover: number;
    precipitationProbability: number;
    visibility: number;
}) : WeatherIconType    {
    switch(weatherCode) {
        case 1000:
            return 'sun';
        case 1100:
        case 1101: 
            return 'partlyCloud';
        case 1102:
        case 1001:
            return 'cloud';
        case 4000:
        case 4200:
        case 4201:
            return 'rain';
        case 2000:
        case 2100:
            return 'fog';
    }

    if(visibility < 3) {
        return 'fog';
    }
    if(precipitationProbability > 50) {
        return 'rain';
    }
    if(cloudCover > 75) {
        return 'cloud';
    }
    if(cloudCover > 30) {
        return 'partlyCloud';
    }

    return 'sun';
}