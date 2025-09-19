//Tela de entrada no aplicativo, é a primeira tela que aparece ao entrar a primeira vez no app
//Imports padrão
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

//Components
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";

//Naviation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>

export function LoginScreen({navigation} : Props)   {
    return (
        <View style={styles.loginScreen_container}>
            <LoginStructure>
                <View  style={styles.loginScreen_buttons}>
                    <SimpleButton
                        title="Entrar"
                        mainColor="#008000"
                        variant="primary"
                        onPress={() => navigation.navigate("SignInScreen")}
                    />
                    <SimpleButton
                        title="Registrar-se"
                        mainColor="#80A218"
                        variant="primary"
                        onPress={() => navigation.navigate("SignUpScreen")}
                    />
                </View>
            </LoginStructure>
        </View>        
    )
}
