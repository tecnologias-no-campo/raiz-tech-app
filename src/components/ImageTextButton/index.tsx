import React from "react";
import {Text, Image, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {styles} from "./styles";

interface ImageTextButtonProps extends TouchableOpacityProps {
    source: any;
    text: string;
    mainColor: string;
    variant: 'primary' | 'secondary';
}

export function ImageTextButton({source, text, mainColor, variant = 'primary', ...rest}: ImageTextButtonProps) {
    const buttonStyle = [
        variant === 'primary' 
        ? [styles.primaryButton, {backgroundColor: mainColor || '#000'}] 
        : [styles.secondaryButton, {borderColor: mainColor || '#000'}], 
        styles.button
    ];

    const textStyle = [
        variant === 'primary' 
        ? [styles.primaryText] 
        : [styles.secondaryText],
        styles.text
    ];

    return (
        <TouchableOpacity style={buttonStyle}>
            <Image source={source} style={styles.image} />
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}