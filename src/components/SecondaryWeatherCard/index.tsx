// Componente que define um dos cards internos da previsão do tempo. Componente de uma das características climáticas secundárias

//Imports padrão
import React from "react";
import {View, Text, Image} from "react-native";
import {styles} from "./styles";

//Components
import { StandardCard } from "../StandardCard";

interface SecondaryWeatherCardProps   {
    icon: any;
    text: string;
    data: string;
    width: any;
    height: any;
}

export function SecondaryWeatherCard({icon, text, data, width, height} : SecondaryWeatherCardProps)    {
    return  (
        <StandardCard  
            width={width} 
            height={height} 
            borderColor='#80A218' 
            borderWidth={2} 
            style={[{
                flexDirection: 'column', 
                justifyContent: 'space-around'
            }]}
        >
            <View style={styles.secondaryWeatherCard_textHeader}>
                <Image style={styles.secondaryWeatherCard_icon} source={icon}/>
                <Text style={styles.secondaryWeatherCard_text}>{text}</Text>
            </View>
            <Text style={styles.secondaryWeatherCard_data}>{data}</Text>
        </StandardCard>
        
    )
}