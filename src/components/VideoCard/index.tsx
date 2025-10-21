// Componente que define o card de apresentação dos vídeos

//Imports padrão
import React from "react";
import {Image, TouchableOpacity, View} from 'react-native';
import {styles} from "./styles"

//Components
import { SecondaryTitle } from "../SecondaryTitle";
import { MainText } from "../MainText";
import { StandardCard } from "../StandardCard";

interface VideoCardProps  {
    image: any;
    title: string;
    text: string;
    onPress: any;
}

export function VideoCard({image, title, text, onPress} : VideoCardProps)   {
    return (
        <TouchableOpacity style={styles.videoCard_shadow}  onPress={onPress}>
            <StandardCard 
                background="transparent"
                borderColor="#80A218" 
                width={300} 
                borderWidth={3} 
            
            >
                <Image style={styles.videoCard_image} source={{uri: image}}/>
                <View style={styles.videoCard_content}>
                    <SecondaryTitle title={title} color="#F0B705"/>
                    <MainText color="#636363">{text}</MainText>
                </View>
            </StandardCard>
        </TouchableOpacity>
    )
}