import React from "react";
import {Image, TouchableOpacity, View} from 'react-native';
import { SecondaryTitle } from "../SecondaryTitle";
import { MainText } from "../MainText";
import { StandardCard } from "../StandardCard";
import {styles} from "./styles"

interface VideoCardProps  {
    image: any,
    title: string,
    text: string,
    onPress: any,
}

export function VideoCard({image, title, text, onPress, ...rest} : VideoCardProps)   {
    return (
        <TouchableOpacity onPress={onPress}>
            <StandardCard borderColor="#80A218" width={300} borderWidth={3} style={{marginBottom: 35}}>
                <Image style={styles.image} source={{uri: image}}/>
                <View style={styles.content}>
                    <SecondaryTitle title={title} color="#008000"/>
                    <MainText color="#636363">{text}</MainText>
                </View>
            </StandardCard>
        </TouchableOpacity>
    )
}