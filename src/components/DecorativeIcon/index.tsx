import React from "react";
import { View, ViewProps, Image } from "react-native";
import { styles } from "./styles";

interface DecorativeIconProps extends ViewProps {
    source?: any;
    backgroundColor?: string;
}

export function DecorativeIcon({source, backgroundColor, ...rest} : DecorativeIconProps) {
    return(
        <View 
        style={[styles.button,
            {backgroundColor: backgroundColor || "" },
        ]}>
            <Image source={source} style={styles.image} />
        </View>
    )
}