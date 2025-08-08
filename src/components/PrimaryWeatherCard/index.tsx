import React from "react";
import {View, ViewProps, Text, Image} from "react-native";
import { StandardCard } from "../StandardCard";
import {styles} from "./styles";

interface PrimaryWeatherCardProps extends ViewProps {
    icon: any,
    max: string,
    min: string;
    width: any;
    height: any;
}

export function PrimaryWeatherCard({icon, max, min, width, height, ...rest} : PrimaryWeatherCardProps) {
    return (
        <StandardCard width={width} height={height} borderColor='#80A218' borderWidth={2} style={[{flexDirection: 'row', justifyContent: 'space-around'}]}>
            <Image style={styles.icon} source={icon}/>
            <View style={styles.infoView}>
                <View style={styles.textView}>
                    <Text style={styles.textStrong}>MAX: </Text>
                    <Text style={styles.textStandard}>{max}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textStrong}>MAX: </Text>
                    <Text style={styles.textStandard}>{max}</Text>
                </View>
            </View>
        </StandardCard>
    )
}