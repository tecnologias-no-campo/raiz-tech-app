//Imports padrão
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

//Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { SimpleButton } from "../../components/SimpleButton";

//Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'SettingsScreen'>

export function SettingsScreen({navigation} : Props)    {
    return (
        <MainStructure>
            <MainHeader
                title="Configurações"
                source={require('../../assets/images/icons/general/settings-icon.png')}
            />
            <View style={styles.settingsScreen_container}>
                <SimpleButton
                    title="Sobre o app"
                    variant="secondary"
                    mainColor="#80A218"
                    onPress={() => navigation.navigate("AboutScreen")}
                />
                <SimpleButton
                    title="Ajuda e suporte"
                    variant="secondary"
                    mainColor="#80A218"
                    onPress={() => navigation.navigate("SupportScreen")}
                />
            </View>
        </MainStructure>
    )
}

