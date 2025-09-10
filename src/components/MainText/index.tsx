//Componente que define o tipo de texto padrão utilizado no aplicativo

//Imports padrão
import React from "react";
import {Text, TextProps} from  'react-native';
import {styles} from './styles';

interface MainTextProps extends TextProps {
    color: any;
}

export function MainText({color, children} : MainTextProps)    {
    return  (
        <Text style={[styles.mainText_text, {color: color}]}>
            {children}
        </Text>
    )
}