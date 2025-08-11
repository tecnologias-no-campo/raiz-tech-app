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
}

export function VideoCard({image, title, text, ...rest} : VideoCardProps)   {
    return (
        <TouchableOpacity>
            <StandardCard borderColor="#80A218" width={300} borderWidth={3}>
                <Image style={styles.image} source={image}/>
                <View style={styles.content}>
                    <SecondaryTitle title={title} color="#008000"/>
                    <MainText color="#636363">{text}</MainText>
                </View>
            </StandardCard>
        </TouchableOpacity>
    )
}