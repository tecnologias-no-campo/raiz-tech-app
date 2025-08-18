import React from "react";
import { View, ViewProps } from "react-native";
import { MainTitle } from "../MainTitle";
import { ImageButton } from "../ImageButton";
import { DecorativeIcon } from "../DecorativeIcon";
import {styles} from "./styles";

//Hooks 
import { useNavigation } from "@react-navigation/native";

interface MainHeaderProps extends ViewProps {
    title: string;
    source: any;

}

export function MainHeader({title, source, ...rest} : MainHeaderProps)  {

    const navigation = useNavigation();

    return  (
        <View style={styles.externalContainer}>
            <ImageButton
            backgroundColor="#ffffff"
            source={require('../../assets/images/icons/general/arrow-icon.png')}
            onPress={() => navigation.goBack()}
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