import React from "react";
import { View, ViewProps } from "react-native";
import { MainTitle } from "../MainTitle";
import { ImageButton } from "../ImageButton";
import { DecorativeIcon } from "../DecorativeIcon";
import {styles} from "./styles";

interface MainHeaderProps extends ViewProps {
    title: string;
    source: any;
}

export function MainHeader({title, source, ...rest} : MainHeaderProps)  {
    return  (
        <View style={styles.externalContainer}>
            <ImageButton
            backgroundColor="#ffffff"
            source={require('../../assets/images/icons/general/arrow-icon.png')}
            />
            <View  style={styles.internalContainer}>
                <MainTitle
                title={title}
                />
                <DecorativeIcon
                backgroundColor="#80A218"
                source={source}
                />
            </View>
        </View>
    )
}