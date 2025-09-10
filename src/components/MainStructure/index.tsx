//Componente que define a estrutura padrão das telas logadas do aplicativo, com a barra de navegação inferior

//Imports
import React from "react";
import { View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles"

//Components
import { FooterNav } from "../FooterNav";

export function MainStructure({children} : ViewProps) {
    return(
        <SafeAreaView style={{flex: 1, padding: 0, margin: 0}} edges={["top", "bottom"]}>
            <View style={{flex: 1, alignItems: 'center'}}>
                {children}
            </View>
            <FooterNav/>
        </SafeAreaView>
    )
}