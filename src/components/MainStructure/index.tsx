import React from "react";
import { MainHeader } from "../MainHeader";
import { FooterNav } from "../FooterNav";
import { View, ScrollView, Dimensions, ScrollViewProps } from "react-native";

const {width, height} = Dimensions.get("window");

export function MainStructure({children} : ScrollViewProps) {
    return(
        <View style={{flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
            <ScrollView contentContainerStyle={{alignItems: "center", flex: 1}}>
                {children}
            </ScrollView>
            <FooterNav/>
        </View>
    )
}