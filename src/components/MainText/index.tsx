import React from "react";
import {Text, TextProps} from  'react-native';
import {styles} from './styles';

interface MainTextProps extends TextProps {
    color: any;
}

export function MainText({color, children, ...rest} : MainTextProps)    {
    return  (
        <Text style={[styles.text, {color: color}]}>
            {children}
        </Text>
    )
}