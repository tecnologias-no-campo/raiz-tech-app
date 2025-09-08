//Imports padrão
import React from "react";
import { View, ImageBackground, StatusBar } from "react-native";
import { styles } from "./styles";

//Components
import { MainStructure } from "../../components/MainStructure";
import { MainTitle } from "../../components/MainTitle";
import { ImageTextButton } from "../../components/ImageTextButton";
import { MainText } from "../../components/MainText";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";



type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>

export function HomeScreen({navigation} : Props)    {
    return (
        <>
        <StatusBar
            translucent
            backgroundColor={"transparent"}
            barStyle={"light-content"}
        />
            <ImageBackground
                source={require('../../assets/images/pictures/teste.jpg')}
                style={styles.background}
            >
            <View style={styles.overlay}>
                <MainStructure>              
                            <View  style={styles.align}>
                                <MainTitle
                                    title="Olá agricultor"
                                />
                                <MainText color='#fdfdfd'>Aqui você encontra: </MainText>

                                <MainText color='#fdfdfd'>Histórico de preços de safras anteriores</MainText>

                                <ImageTextButton
                                    source={require('../../assets/images/icons/general/money-icon.png')}
                                    text="Histórico"
                                    mainColor="#80A218"
                                    variant="primary"
                                    onPress={() => navigation.navigate("MenuHistoryScreen")}
                                />

                                <MainText color='#fdfdfd'>Previsão do tempo para planejar a sua safra</MainText>

                                <ImageTextButton
                                    source={require('../../assets/images/icons/general/weather-icon.png')}
                                    text="Clima"
                                    mainColor="#80A218"
                                    variant="primary"
                                    onPress={() => navigation.navigate("MenuWeatherScreen")}
                                />

                                <MainText color='#fdfdfd'>Vídeos educativos para melhorar suas técnicas</MainText>

                                <ImageTextButton
                                    source={require('../../assets/images/icons/general/play-button-icon.png')}
                                    text="Vídeos"
                                    mainColor="#80A218"
                                    variant="primary"
                                    onPress={() => navigation.navigate("MenuVideoScreen")}
                                />
                            </View>

                                        
                </MainStructure>
                </View>
                </ImageBackground>
        
        </>                
    )
}
