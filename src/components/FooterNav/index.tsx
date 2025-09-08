//Componente que define o menu inferior de navegação do aplicativo

//Imports padrão
import React from "react";
import { View } from "react-native";
import {styles} from "./styles";

//Components
import { ImageButton } from "../ImageButton";

//Navigation
import {useNavigation} from '@react-navigation/native';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

export function FooterNav()   {

    //Lógica de retornar o Stack par tela inicial
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const goToGHome = () => {
        navigation.navigate('HomeScreen');
    }

    return (
        <View style={styles.footerNav_container}>
            <ImageButton 
                source={require('../../assets/images/icons/general/settings-icon.png')}
            />

            <View
            style={styles.footerNav_main_button}>
                <ImageButton 
                backgroundColor="#ffffff"
                source={require('../../assets/images/logos/logo-app-simple.png')}
                onPress={goToGHome}
                />
            </View>
            

            <ImageButton
                source={require('../../assets/images/icons/general/person-icon.png')}
            />
        </View>
    )
}

// Será necessário usar o SafeAreaView para que o FooterNav não fique "grudado" na parte inferior da tela 
// em dispositivos com "notch" (entalhe) ou barras de navegação.