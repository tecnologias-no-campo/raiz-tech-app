import React from "react";
import {ImageBackground, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {styles} from "./styles";

interface PlaylistButtonProps extends TouchableOpacityProps {
    backgroundImage: any,
    text: string,
    onPress: any,
}

export function PlaylistButton({backgroundImage, text, onPress, ...rest} : PlaylistButtonProps)  {

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <ImageBackground source={backgroundImage} style={styles.image} imageStyle={{borderRadius: 10}}>
                <Text style={styles.text}>{text}</Text>
            </ImageBackground>          
        </TouchableOpacity>
    )
}