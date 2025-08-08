import React from "react";
import {View, ViewProps, Text, Image} from "react-native";
import { StandardCard } from "../StandardCard";
import {styles} from "./styles";

interface SecondaryWeatherCardProps extends ViewProps   {
    icon: any,
    text: string,
    data: string,
    width: any,
    height: any,
}

export function SecondaryWeatherCard({icon, text, data, width, height, ...rest} : SecondaryWeatherCardProps)    {
    return  (
        <StandardCard  width={width} height={height} borderColor='#80A218' borderWidth={2} style={[{flexDirection: 'column', justifyContent: 'space-around'}]}>
            <View style={styles.textHeader}>
                <Image style={styles.icon} source={icon}/>
                <Text style={styles.text}>{text}</Text>
            </View>
            <Text style={styles.data}>{data}</Text>
        </StandardCard>
        
    )
}