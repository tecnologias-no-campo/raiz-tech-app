import React from "react";
import { styles } from "./styles";
import { View, Dimensions, ScrollView } from "react-native";

//Mock de dados
import mockWeatherRealTime from '../../data/mockTOMORROWrt.json'
import { WeatherRealtime } from "../../types/weatherRtType";

//Components
import { ImageTextButton } from "../../components/ImageTextButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";
import { StandardCard } from "../../components/StandardCard";
import { SecondaryWeatherCard } from "../../components/SecondaryWeatherCard";
import { SecondaryTitle } from "../../components/SecondaryTitle";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'MenuWeatherScreen'>

export function MenuWeatherScreen({navigation} : Props)  {

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.9;

    //Mock de dados
    const realtime : WeatherRealtime = mockWeatherRealTime;
    const values = realtime.data.values;

    return (
        <MainStructure>
            <MainHeader
                title="Clima"
                source={require('../../assets/images/icons/general/weather-icon.png')}
            />

            <View  style={{flex: 1, justifyContent: 'center'}}>

                <StandardCard   borderColor='#008000' borderWidth={3} width={cardWidth} height={250} style={[{justifyContent: 'center', paddingVertical: 20, marginVertical: 20}]}>
                    <SecondaryTitle
                        title='AGORA'
                        color="#008000"
                    />
                    <ScrollView style={{width: cardWidth}}>
                        <View style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Temperatura'
                            data={`${values.temperature.toFixed(1)}°C`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Tempertura Aparente'
                            data={`${values.temperatureApparent.toFixed(1)}°C`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View  style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/humidity-icon.png')}
                            text='Humidade Relativa'
                            data={`${values.humidity}%`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/cloud-icon.png')}
                            text='Cobertura de Nuvens'
                            data={`${values.cloudCover}%`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Probabilidade de chuva'
                            data={`${values.precipitationProbability}%`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/wind-icon.png')}
                            text='Velocidade do vento'
                            data={`${values.windSpeed} km/h`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View  style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/wind-icon.png')}
                            text='Direção do vento'
                            data={`${values.windDirection}°`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Índice UV'
                            data={`${values.uvIndex}`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Visibilidade'
                            data={`${values.visibility} km`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Intensidade da chuva'
                            data={`${values.rainIntensity} mm/h`}
                            width='45%'
                            height={90}
                        />
                    </View>
                    </ScrollView>              
                </StandardCard>

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="hoje"
                    mainColor="#80A218"
                    variant="secondary"
                    onPress={() => navigation.navigate('ForecastWeatherScreen', {period: 'today'})}
                    
                />

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="amanhã"
                    mainColor="#80A218"
                    variant="secondary"
                    onPress={() => navigation.navigate('ForecastWeatherScreen', {period: 'tomorrow'})}
                />

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="próximos dias"
                    mainColor="#80A218"
                    variant="secondary"
                    onPress={() => navigation.navigate('ForecastWeatherScreen', {period: 'nextdays'})}
                />
                
            </View>
        </MainStructure>
    )
}