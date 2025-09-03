//Imports padrão
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

//Components
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";
import { FormField } from "../../components/FormField";

//Naviation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>

export function SignInScreen({navigation} : Props)  {
    return (
        <View style={styles.signInScreen_containar}>
            <LoginStructure>
                <View style={styles.signInScreen_form}>
                    <FormField
                        label="Email"
                        mainColor="#008000"
                        keyboardType="email-address"
                    />
                     <FormField
                        label="Senha"
                        mainColor="#008000"
                        keyboardType="numeric"
                        secureTextEntry={true}
                    />
                    <SimpleButton
                        title="Entrar"
                        mainColor="#008000"
                        variant="primary"
                    />
                </View>
            </LoginStructure>
        </View>
    )
}