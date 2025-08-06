import React from "react";
import { View } from "react-native";
import { ImageButton } from "../ImageButton";
import {styles} from "./styles";

export function FooterNav()   {
    return (
        <View style={styles.container}>
            <ImageButton 
                source={require('../../assets/images/icons/general/settings-icon.png')}
            />

            <View
            style={{
                borderColor: '#008000',
                borderWidth: 15,
                borderRadius: 50,
                alignSelf: 'center',
                top: -15,
            }}>
                <ImageButton 
                backgroundColor="#ffffff"
                source={require('../../assets/images/logos/logo-app-simple.png')}
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