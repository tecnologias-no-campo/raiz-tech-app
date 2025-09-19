//Tela que apresenta o formulário de cadastro no aplicativo, com informações pessoais dos produtores
//Imports padrão
import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./styles";

//Components
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";
import { FormField } from "../../components/FormField";
import { DropDownMenu } from "../../components/DropDownMenu";

//Naviation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpFormScreen'>

export function SignUpFormScreen({navigation} : Props)  {
    return (
        <View style={styles.signUpScreen_container}>
            <LoginStructure>
                <ScrollView  style={styles.signUpScreen_form}>
                    <FormField
                        label="Nome completo"
                        mainColor="#80A218"
                        keyboardType="default"
                    />
                    <FormField
                        label="Fazenda"
                        mainColor="#80A218"
                        keyboardType="default"
                    />
                    <FormField
                        label="Cidade"
                        mainColor="#80A218"
                        keyboardType="default"
                    />
                    <FormField
                        label="Área total"
                        mainColor="#80A218"
                        keyboardType="numeric"
                    />
                    <FormField
                        label="Tipo da produção"
                        mainColor="#80A218"
                        keyboardType="default"
                    />
                    <FormField
                        label="Principal produto"
                        mainColor="#80A218"
                        keyboardType="default"
                    />
                    <FormField
                        label="Número de trabalhadores"
                        mainColor="#80A218"
                        keyboardType="numeric"
                    />
                    <DropDownMenu
                        mainColor="#80A218"
                        options={["Básico", "Médio", "Avançado"]}
                    />

                    <SimpleButton
                        title="Registrar-se"
                        mainColor="#80A218"
                        variant="primary"
                        onPress={() => navigation.navigate("HomeScreen")}
                    />                   
                </ScrollView>
            </LoginStructure>
        </View>
    )
}