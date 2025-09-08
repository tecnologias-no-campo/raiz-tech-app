// Aqui é definido um dos tipos de botão que tem no app, algém dos vários que vocês já conhecem

//Imports padrão
import React from "react";
import {Text, Image, TouchableOpacity, TouchableOpacityProps, Dimensions} from "react-native";
import {styles} from "./styles";

interface ImageTextButtonProps extends TouchableOpacityProps {
    source: any;
    text: string;
    mainColor: string;
    variant: 'primary' | 'secondary';
    onPress: any;
}

export function ImageTextButton({source, text, mainColor, variant, onPress}: ImageTextButtonProps) {

    //Define tamanho da tela de forma dinâmica
    const screenWidth = Dimensions.get('window').width;
    const secondaryButttonWidth = screenWidth * 0.9;

    const buttonStyle = [
        variant === 'primary' 
        ? [styles.imageTextButton_primaryButton, {backgroundColor: mainColor || '#000'}] 
        : [styles.imageTextButton_secondaryButton, 
            {
                borderColor: mainColor || '#000',
                width: secondaryButttonWidth
            }], 
        styles.imageTextButton_button
    ];

    const textStyle = [
        variant === 'primary' 
        ? [styles.imageTextButton_primaryText] 
        : [styles.imageTextButton_secondaryText],
        styles.imageTextButton_text
    ];

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Image source={source} style={styles.imageTextButton_image} />
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}