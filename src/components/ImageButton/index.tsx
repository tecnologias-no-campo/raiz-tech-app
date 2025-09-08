//Componente que define um botão imagem para o sistema.

//Imports padrão
import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Image } from "react-native";
import { styles } from "./styles";

interface ImageButtonProps extends TouchableOpacityProps {
    source?: any;
    backgroundColor?: string;
    onPress: any;
}

export function ImageButton({source, backgroundColor, onPress, ...rest} : ImageButtonProps) {
    return(
        <TouchableOpacity 
        style={[styles.imageButton_button,
            {backgroundColor: backgroundColor || "" },
            rest.style
        ]}
        onPress={onPress}
        {...rest}
        >
            <Image source={source} style={styles.imageButton_image} />
        </TouchableOpacity>
    )
}