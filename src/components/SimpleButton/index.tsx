import React from "react";
import {Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {styles} from "./styles";

interface SimpleButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
    mainColor?: string;
    onPress: any;
    
}

export function SimpleButton({title, variant, style, mainColor, onPress, ...rest}: SimpleButtonProps) {
    const isPrimary = variant === 'primary';

    const buttonStyles = isPrimary
        ? [styles.buttonPrimary, {backgroundColor: mainColor || '#000'}]
        : [styles.buttonSecondary, {borderColor: mainColor || '#000', borderWidth: 2}];

    
    const textStyles = isPrimary
        ? styles.textPrimary
        : [styles.textSecondary, {color: mainColor || '#000'}];

    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyles, style]} {...rest}>
            <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    );   
}