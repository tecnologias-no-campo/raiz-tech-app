//Componente que define o tipo de tiitulo secundário do aplicativo

//Imports padrão
import React from "react";
import {Text} from "react-native";
import {styles} from "./styles";

interface MainTitleProps {
    title: string;
    color: string;
};

export function SecondaryTitle( {title, color} : MainTitleProps) {
    return (
        <Text style={[styles.secondaryTitle_title, {color: color}]}>
            {title}
        </Text>
    );
}