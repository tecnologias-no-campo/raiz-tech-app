import React from "react";
import { ImageTextButton } from "../../components/ImageTextButton";
import { FooterNav } from "../../components/FooterNav";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";
import { ScrollView, View } from "react-native";
import { styles } from "./style";

export function ProductHistoryScreen()   {
    return  (
            <MainStructure>
                <MainHeader
                    title="Histórico"
                    source={require('../../assets/images/icons/general/money-icon.png')}
                />
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ImageTextButton
                        source={require('../../assets/images/icons/history/tobacco-icon.png')}
                        text="tabaco"
                        mainColor="#80A218"
                        variant="secondary"
                    />

                    <ImageTextButton
                        source={require('../../assets/images/icons/history/soy-icon.png')}
                        text="soja"
                        mainColor="#80A218"
                        variant="secondary"
                    />

                    <ImageTextButton
                        source={require('../../assets/images/icons/history/corn-icon.png')}
                        text="milho"
                        mainColor="#80A218"
                        variant="secondary"
                    />

                    <ImageTextButton
                        source={require('../../assets/images/icons/history/bean-icon.png')}
                        text="feijão"
                        mainColor="#80A218"
                        variant="secondary"
                    />

                    <ImageTextButton
                        source={require('../../assets/images/icons/history/wheat-icon.png')}
                        text="trigo"
                        mainColor="#80A218"
                        variant="secondary"
                    />

                    <ImageTextButton
                        source={require('../../assets/images/icons/history/onion-icon.png')}
                        text="cebola"
                        mainColor="#80A218"
                        variant="secondary"
                    />

                    <ImageTextButton
                        source={require('../../assets/images/icons/history/potato-icon.png')}
                        text="batata"
                        mainColor="#80A218"
                        variant="secondary"
                    />
                </View>   
            </MainStructure>             
    )
}