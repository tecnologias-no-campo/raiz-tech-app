import React from "react";
import {Text, TextProps} from "react-native";
import {styles} from "./styles";

interface MainTitleProps extends TextProps {
    title: string;
};

export function MainTitle( {title, ...rest} : MainTitleProps) {
    return (
        <Text style={styles.title}>
            {title}
        </Text>
    );
}