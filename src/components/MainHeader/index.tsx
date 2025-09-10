//Componente padrão que define o cabeçalho das telas do aplicativo, com botão de retorno, título e ícone decorativo

//Imports padrão
import React from "react";
import { View } from "react-native";
import {styles} from "./styles";

//Components
import { MainTitle } from "../MainTitle";
import { ImageButton } from "../ImageButton";
import { DecorativeIcon } from "../DecorativeIcon";

//Hooks 
import { useNavigation } from "@react-navigation/native";

interface MainHeaderProps {
    title: string;
    source: any;
}

export function MainHeader({title, source} : MainHeaderProps)  {

    //Define comportamento de navegação de retorno
    const navigation = useNavigation();

    return  (
        <View style={styles.mainHeader_externalContainer}>
            <ImageButton
                backgroundColor="#ffffff"
                source={require('../../assets/images/icons/general/arrow-icon.png')}
                onPress={() => navigation.goBack()}
            />
            <View  style={styles.mainHeader_internalContainer}>
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