//Tela que tem o formulário de login no aplicativo
//Imports padrão
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";

//Components
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";
import { FormField } from "../../components/FormField";

//Naviation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Supabase
import { supabase } from "../../services/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>

export function SignInScreen({navigation} : Props)  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignIn()   {
        setLoading(true);

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password,
        });

        setLoading(false);

        if(error)   {
            if (error.message.toLowerCase().includes("invalid login credentials")) {
                Alert.alert("Erro no login, Email ou senha incorretos, tente novamnete!");
            } else {
                Alert.alert("Erro no login", error.message);
            }
        } else if(data.session) {
            Alert.alert("Bem-vindo, Login efetuado com sucesso");
            navigation.navigate("HomeScreen");
        }
    }

    return (
            <View style={styles.signInScreen_containar}>
                <LoginStructure>
                    <View style={styles.signInScreen_form}>
                        <FormField
                            label="Email"
                            mainColor="#008000"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                        <FormField
                            label="Senha"
                            mainColor="#008000"
                            keyboardType="default"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <SimpleButton
                            title={loading ? "Entrando..." : "Entrar"}
                            mainColor="#008000"
                            variant="primary"
                            onPress={handleSignIn}
                            disabled={loading}
                        />
                    </View>
                </LoginStructure>
            </View>
    )
}