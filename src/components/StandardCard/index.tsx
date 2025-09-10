//Componente que define um tipo de card padrão que é usado tanto em histórico, previsão do tempo e vídeos

//Imports padrão
import React from "react";
import {View, ViewProps} from "react-native";
import {styles} from "./styles";

interface StandardCardProps extends ViewProps{
    background?: string;
    borderColor: string;
    width: any;
    height?: any;
    borderWidth: number;
}

export function StandardCard({children, background, borderColor, width, height, borderWidth, ...rest} : StandardCardProps) {

    const viewstyles = [
        styles.standardCard_card,
        background ? {background: background} : {},
        {borderColor: borderColor, width: width, height: height, borderWidth:borderWidth},
        rest.style
    ]

    return (
        <View style={viewstyles}>
            {children}
        </View>
    )
}