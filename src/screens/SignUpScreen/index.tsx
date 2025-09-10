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

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>

export function SignUpScreen({navigation} : Props)  {
    return  (
        <View style={styles.signUpScreen_container}>
            <LoginStructure>
                <FormField
                    label="Email"
                    mainColor="#80A218"
                    keyboardType="email-address"
                />
                <FormField
                    label="Senha"
                    mainColor="#80A218"
                    keyboardType="numeric"
                    secureTextEntry={true}
                />
                <SimpleButton
                    title="Continuar"
                    mainColor="#80A218"
                    variant="primary"
                    onPress={() => navigation.navigate("SignUpFormScreen")}
                />
            </LoginStructure>
        </View>
    )
}