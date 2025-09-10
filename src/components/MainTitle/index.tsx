//Comonente que define o estilo do título principal do aplicativo

//Imports padrão
import React from "react";
import {Text} from "react-native";
import {styles} from "./styles";

interface MainTitleProps {
    title: string;
};

export function MainTitle( {title} : MainTitleProps) {
    return (
        <Text style={styles.mainTitle_title}>
            {title}
        </Text>
    );
}