//Tela de suporte que permite enviar um email para o projeto no caso de dúvidas e dificuldades com o app
//Imports padrão
import React from "react";
import { View, Linking } from "react-native";
import { styles } from "./styles";

//Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { MainText } from "../../components/MainText";
import { SimpleButton } from "../../components/SimpleButton";

//Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'SupportScreen'>

export function SupportScreen()   {

    const handleEmail = () => {
        Linking.openURL("mailto:tecnologiasnocampo@uepg.br")
    }

    return(
        <MainStructure>
            <MainHeader
                title="Ajuda e suporte"
                source={require('../../assets/images/icons/general/settings-icon.png')}
            />

            <View style={styles.supportScreen_container}>
                <MainText style={styles.supportScreen_content} color='#636363'>
                    Caso tenha alguma dúvida ou problema com o aplicativo envie um email clicando no botão abaixo. Ficaremos felizes em ajudar você!
                </MainText>

                <SimpleButton
                    title="Enviar email"
                    mainColor="#008000"
                    variant="primary"
                    onPress={handleEmail}
                />
            </View>
        </MainStructure>
    )
}