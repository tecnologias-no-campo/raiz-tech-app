import React from "react";
import {ImageBackground, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {styles} from "./styles";

interface PlaylistButtonProps extends TouchableOpacityProps {
    backgroundImage: any,
    text: string,
}

export function PlaylistButton({backgroundImage, text, ...rest} : PlaylistButtonProps)  {

    return (
        <TouchableOpacity style={styles.button}>
            <ImageBackground source={backgroundImage} style={styles.image} imageStyle={{borderRadius: 10}}>
                <Text style={styles.text}>{text}</Text>
            </ImageBackground>          
        </TouchableOpacity>
    )
}