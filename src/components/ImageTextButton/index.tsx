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

export function ImageTextButton({source, text, mainColor, variant, onPress, ...rest}: ImageTextButtonProps) {

    const screenWidth = Dimensions.get('window').width;
    const secondaryButttonWidth = screenWidth * 0.9;

    const buttonStyle = [
        variant === 'primary' 
        ? [styles.primaryButton, {backgroundColor: mainColor || '#000'}] 
        : [styles.secondaryButton, 
            {
                borderColor: mainColor || '#000',
                width: secondaryButttonWidth
            }], 
        styles.button
    ];

    const textStyle = [
        variant === 'primary' 
        ? [styles.primaryText] 
        : [styles.secondaryText],
        styles.text
    ];

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Image source={source} style={styles.image} />
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}