//Componente que define um dos cards internos de previsão do tempo. O que traz temperaturas e ícone representativo

//Imports padrão
import React from "react";
import {View, Text, Image} from "react-native";
import {styles} from "./styles";

//Components
import { StandardCard } from "../StandardCard";

interface PrimaryWeatherCardProps {
    icon: any;
    max: string;
    min: string;
    width: any;
    height: any;
}

export function PrimaryWeatherCard({icon, max, min, width, height} : PrimaryWeatherCardProps) {
    return (
        <StandardCard 
            width={width} 
            height={height} 
            borderColor='#80A218' 
            borderWidth={2}
            style={[{
                flexDirection: 'row', 
                justifyContent: 'space-around'
            }]}
        >
            <Image style={styles.primaryWeatherCard_icon} source={icon}/>
            <View style={styles.primaryWeatherCard_infoView}>
                <View style={styles.primaryWeatherCard_textView}>
                    <Text style={styles.primaryWeatherCard_textStrong}>MAX: </Text>
                    <Text style={styles.primaryWeatherCard_textStandard}>{max}</Text>
                </View>
                <View style={styles.primaryWeatherCard_textView}>
                    <Text style={styles.primaryWeatherCard_textStrong}>MIN: </Text>
                    <Text style={styles.primaryWeatherCard_textStandard}>{min}</Text>
                </View>
            </View>
        </StandardCard>
    )
}