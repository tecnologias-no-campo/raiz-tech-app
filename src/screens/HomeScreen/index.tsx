//Componente que define a tela inicial do aplicativo, com direcionamento para as suas funcionalidades
//Imports padrão
import React from "react";
import { View, ImageBackground } from "react-native";
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
            <MainStructure>  
                <View style={styles.homeScreen_overlay}>
                <ImageBackground
                    source={require('../../assets/images/pictures/landscape05.jpg')}
                    style={styles.homeScreen_background}
                >          
                            <View  style={styles.homeScreen_align}>
                                <MainTitle
                                    title="Olá agricultor"
                                />

                                <View style={styles.homeScreen_contentAlign}>
                                    <MainText color='#fdfdfd' style={styles.homeScreen_text}>Clique nos botões abaixo para acessar as funcionalidades do app</MainText>

                                    <ImageTextButton
                                        source={require('../../assets/images/icons/general/money-icon.png')}
                                        text="Histórico"
                                        mainColor="#80A218"
                                        variant="primary"
                                        onPress={() => navigation.navigate("MenuHistoryScreen")}
                                    />

                                    <ImageTextButton
                                        source={require('../../assets/images/icons/general/weather-icon.png')}
                                        text="Clima"
                                        mainColor="#80A218"
                                        variant="primary"
                                        onPress={() => navigation.navigate("MenuWeatherScreen")}
                                    />

                                    <ImageTextButton
                                        source={require('../../assets/images/icons/general/play-button-icon.png')}
                                        text="Vídeos"
                                        mainColor="#80A218"
                                        variant="primary"
                                        onPress={() => navigation.navigate("MenuVideoScreen")}
                                    />
                                </View>
                                
                            </View> 
                    </ImageBackground> 
                    </View>                                      
            </MainStructure>      
        </>                
    )
}
