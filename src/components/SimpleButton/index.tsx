//Compoente que define o tipo de botão mais simples do aplicativo, apenas com texto

//Imports padrão
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
        ? [styles.simpleButton_buttonPrimary, {backgroundColor: mainColor || '#000'}]
        : [styles.simpleButton_buttonSecondary, {borderColor: mainColor || '#000', borderWidth: 2}];

    
    const textStyles = isPrimary
        ? styles.simpleButton_textPrimary
        : [styles.simpleButton_textSecondary, {color: mainColor || '#000'}];

    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[buttonStyles, style]} 
            {...rest}
        >
            <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    );   
}