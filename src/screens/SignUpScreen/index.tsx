//Tela de cadastro no aplicativo que apresenta informações referentes a conta dos usuários: email e senha
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { styles } from "./styles";

// Componentes
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";
import { FormField } from "../../components/FormField";

// Navegação
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Supabase
import { supabase } from "../../services/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>

export function SignUpScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        setLoading(false);

        if (error) {
            if(error.message.includes("already registered"))    {
                Alert.alert("Erro no cadastro, esse email já está cadastrado");
            } else{
                Alert.alert('Erro no Cadastro', error.message);
            }           
        } else {
            if (data?.user?.id) {
                Alert.alert('Sucesso!', 'Verifique seu e-mail para confirmar a conta.');
                
                // Navega para a próxima tela e passa o ID do usuário como parâmetro
                navigation.navigate("SignUpFormScreen", { userId: data.user.id });
            }
        }
    }

    return (
        <View style={styles.signUpScreen_container}>
            <LoginStructure>
                <View style={styles.signInScreen_form}>
                    <FormField
                        label="Email"
                        mainColor="#80A218"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <FormField
                        label="Senha"
                        mainColor="#80A218"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <SimpleButton
                        title={loading ? 'Criando conta...' : "Continuar"}
                        mainColor="#80A218"
                        variant="primary"
                        onPress={handleSignUp}
                        disabled={loading}
                    />
                </View>
            </LoginStructure>
        </View>
    );
}