import React from "react";
import {Text, TextProps} from "react-native";
import {styles} from "./styles";

interface MainTitleProps extends TextProps {
    title: string;
    color: string;
};

export function SecondaryTitle( {title, color, ...rest} : MainTitleProps) {
    return (
        <Text style={[styles.title, {color: color}]}>
            {title}
        </Text>
    );
}