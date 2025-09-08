// Componente de ícone decorativo, usados para mostrar os ícones nos cabaçalhos de cada tela

//Imports padrão
import React from "react";
import { View, ViewProps, Image } from "react-native";
import { styles } from "./styles";

interface DecorativeIconProps extends ViewProps {
    source?: any;
    backgroundColor: string;
}

export function DecorativeIcon({source, backgroundColor} : DecorativeIconProps) {
    return(
        <View 
        style={[styles.decorativeIcon_button,
            {backgroundColor: backgroundColor || "" },
        ]}>
            <Image source={source} style={styles.decorativeIcon_image} />
        </View>
    )
}