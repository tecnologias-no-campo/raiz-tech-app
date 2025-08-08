import React from "react";
import {View, ViewProps, Text, Image} from "react-native";
import { StandardCard } from "../StandardCard";
import { PrimaryWeatherCard } from "../PrimaryWeatherCard";
import { SecondaryWeatherCard } from "../SecondaryWeatherCard";
import { SecondaryTitle } from "../SecondaryTitle";
import {styles} from "./styles";

interface FullWeatherCardProps extends ViewProps    {
    max: string,
    min: string,
    conditionIcon: any,
    evapotranspiration: string,
    probabilityRain: string,
    wind: string,
    humidity: string,
    cloud: string,
}

export function FullWeatherCard({max, min, conditionIcon, evapotranspiration, probabilityRain, wind, humidity, cloud, ...rest} : FullWeatherCardProps) {
    return  (
        <StandardCard  borderColor='#008000' borderWidth={3} width='90%' style={[{justifyContent: 'center', paddingVertical: 20, marginVertical: 20}]}>
            <SecondaryTitle title="HOJE" color="#222222"/>
            <View style={styles.mainSection}>
                <PrimaryWeatherCard 
                    icon={conditionIcon}
                    max={max}
                    min={min}
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
                    <Image style={styles.evapoIcon} source={require('../../assets/images/icons/weather/evapo-icon.png')}/>
                    <Text style={styles.evapoText}>Evapotranspiração</Text> 
                    <Text style={styles.evapoData}>{evapotranspiration}</Text>
                </StandardCard>
                <View style={styles.secondarySection}>
                    <View style={styles.secondarySectionAlign}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Probabilidade de chuva'
                            data={probabilityRain}
                            width='47%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/wind-icon.png')}
                            text='Ventos'
                            data={wind}
                            width='47%'
                            height={90}
                        />
                    </View>
                    <View  style={styles.secondarySectionAlign}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/humidity-icon.png')}
                            text='Umidade Relativa (UR)'
                            data={humidity}
                            width='47%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/cloud-icon.png')}
                            text='Nuvens'
                            data={cloud}
                            width='47%'
                            height={90}
                        />
                    </View>
                </View>
            </View>
        </StandardCard>
    )
}