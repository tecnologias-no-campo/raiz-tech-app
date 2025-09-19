// Componente que define a tela de previsão do tempo, mostrando ou a previsão do dia, ou a previsão de amanhã, ou a previsão dos próximos dias

//Imports padrão
import React from "react";
import { ScrollView } from "react-native";

//Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { FullWeatherCard } from "../../components/FullWeatherCard";

//Mock de dados
import mockForecast from "../../data/mockTOMMOROW.json";
import { ForecastWeatherData, ForecastDay } from "../../types/weatherForecastType";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'ForecastWeatherScreen'>

export function ForecastWeatherScreen({route} : Props) {
    const {period} = route.params;

    // Faz o mock dos dados que estão no formato json
    const forecastData : ForecastWeatherData = mockForecast;
    const forecast : ForecastDay[] = forecastData.timelines.daily;

    //Aqui quando a api for conectada é necessário alterar para ficar dinâmico e nesse mesmo formato
    const today = "2025-08-18";
    const tomorrow = "2025-08-19";

    let dataToDisplay : ForecastDay[] = [];

    // Filtra os dados para mostrar hoje, amanhã ou próximos dias
    if(period === 'today')  {
        dataToDisplay = forecast.filter(day => day.time.startsWith(today));
    } else if(period === 'tomorrow')    {
        dataToDisplay = forecast.filter(day => day.time.startsWith(tomorrow));
    } else {
        dataToDisplay = forecast;
    }

    return (
        <MainStructure>
            <MainHeader
                title={
                    period === 'today'
                    ? "Hoje"
                    : period === 'tomorrow'
                    ? "Amanhã"
                    : "Próximos dias"
                }

                source={require("../../assets/images/icons/general/weather-icon.png")}
            />

            <ScrollView>
                {dataToDisplay.map((day, index) => {
                    const dateObj = new Date(day.time);
                    const formatteDate = dateObj.toLocaleDateString('pt-br');
                    const weekday = dateObj.toLocaleDateString('pt-br', {weekday: 'long'})

                    const dateWithWeekday = `${weekday[0].toUpperCase() + weekday.slice(1)} - ${formatteDate}`

                    return (
                        <FullWeatherCard
                            key={index}
                            date={dateWithWeekday}
                            max={day.values.temperatureMax}
                            min={day.values.temperatureMin}
                            weatherCode={day.values.weatherCodeMax}
                            evapotranspiration={day.values.evapotranspirationAvg}
                            probabilityRain={day.values.precipitationProbabilityAvg}
                            wind={day.values.windSpeedAvg}
                            humidity={day.values.humidityAvg}
                            cloud={day.values.cloudCoverAvg}
                            visibility={day.values.visibilityAvg}
                        />
                    )
                })}
            </ScrollView>
        </MainStructure>
    )
}