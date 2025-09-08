//Componente que define o card completo de previsão do tempo

//Imports padrão
import React from "react";
import {View, ViewProps, Text, Image, Dimensions} from "react-native";
import {styles} from "./styles";

//Components
import { StandardCard } from "../StandardCard";
import { PrimaryWeatherCard } from "../PrimaryWeatherCard";
import { SecondaryWeatherCard } from "../SecondaryWeatherCard";
import { SecondaryTitle } from "../SecondaryTitle";

//Esquema de exibição dos ícones de previsão
import { getWeatherIcon } from "../../utils/weatherIconManage";

interface FullWeatherCardProps extends ViewProps    {
    date: string;
    max: number;
    min: number;
    weatherCode: number;
    evapotranspiration: number;
    probabilityRain: number;
    wind: number;
    humidity: number;
    cloud: number;
    visibility: number;
}

export function FullWeatherCard({date, max, min, weatherCode, evapotranspiration, probabilityRain, wind, humidity, cloud, visibility} : FullWeatherCardProps) {

    // Trabalhando a lógica de exibição dos ícones de previsão do tempo
    const iconMap = {
        sun: require('../../assets/images/icons/weather/sun-condition-icon.png'),
        partlyCloud: require('../../assets/images/icons/weather/cloud-sun-condition-icon.png'),
        cloud: require('../../assets/images/icons/weather/cloud-condition-icon.png'),
        rain: require('../../assets/images/icons/weather/rain-condition-icon.png'),
        fog: require('../../assets/images/icons/weather/cloud-fog-condition-icon.png'),
    }

    const weatherIconKey = getWeatherIcon({
        weatherCode: weatherCode,
        cloudCover: cloud,
        precipitationProbability: probabilityRain,
        visibility: visibility,
    })

    const conditionIcon = iconMap[weatherIconKey];

    // Define dimensões da tela de forma dinâmica
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.9;

    return  (
        <StandardCard  
            borderColor='#008000' 
            borderWidth={3} 
            width={cardWidth} 
            style={[{
                justifyContent: 'center', 
                paddingVertical: 20, 
                marginVertical: 30
            }]}
        >
            <SecondaryTitle title={date} color="#222222"/>
            <View style={styles.fullWeatherCard_mainSection}>
                <PrimaryWeatherCard 
                    icon={conditionIcon}
                    max={`${max} °C`}
                    min={`${min} °C`}
                    width='95%'
                    height={125}
                />
                <StandardCard
                    width='95%' 
                    height={60} 
                    borderColor='#80A218' 
                    borderWidth={2} 
                    style={[{flexDirection: 'row', justifyContent: 'space-around'}]}
                >               
                    <Image style={styles.fullWeatherCard_evapoIcon} source={require('../../assets/images/icons/weather/evapo-icon.png')}/>
                    <Text style={styles.fullWeatherCard_evapoText}>Evapotranspiração</Text> 
                    <Text style={styles.fullWeatherCard_evapoData}>{evapotranspiration}</Text>
                </StandardCard>
                <View style={styles.fullWeatherCard_secondarySection}>
                    <View style={styles.fullWeatherCard_secondarySectionAlign}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Probabilidade de chuva'
                            data={`${probabilityRain}%`}
                            width='47%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/wind-icon.png')}
                            text='Ventos'
                            data={`${wind} km/h`}
                            width='47%'
                            height={90}
                        />
                    </View>
                    <View  style={styles.fullWeatherCard_secondarySectionAlign}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/humidity-icon.png')}
                            text='Umidade Relativa (UR)'
                            data={`${humidity}%`}
                            width='47%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/cloud-icon.png')}
                            text='Nuvens'
                            data={`${cloud}%`}
                            width='47%'
                            height={90}
                        />
                    </View>
                </View>
            </View>
        </StandardCard>
    )
}

//Aqui tem algumas dimensões em porcentagem, porém elas são responsívas de acordo com a tela