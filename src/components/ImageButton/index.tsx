import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Image } from "react-native";
import { styles } from "./styles";

interface ImageButtonProps extends TouchableOpacityProps {
    source?: any;
    backgroundColor?: string;
}

export function ImageButton({source, backgroundColor, ...rest} : ImageButtonProps) {
    return(
        <TouchableOpacity 
        style={[styles.button,
            {backgroundColor: backgroundColor || "" },
            rest.style
        ]}>
            <Image source={source} style={styles.image} />
        </TouchableOpacity>
    )
}