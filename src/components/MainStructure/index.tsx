import React from "react";
import { MainHeader } from "../MainHeader";
import { FooterNav } from "../FooterNav";
import { ScrollView, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


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