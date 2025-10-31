// SignInScreen.tsx
// Tela que tem o formulário de login no aplicativo

import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";

// Components
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";
import { FormField } from "../../components/FormField";

// Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Supabase (client com SecureStore)
import { supabase } from "../../services/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, "SignInScreen">;

export function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    const trimmedEmail = email.trim().toLowerCase();

    // validação básica
    if (!trimmedEmail || !password) {
      Alert.alert("Campos obrigatórios", "Informe e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        const msg = error.message?.toLowerCase() || "";
        if (msg.includes("invalid login credentials")) {
          Alert.alert("Erro no login", "E-mail ou senha incorretos. Tente novamente.");
        } else {
          Alert.alert("Erro no login", error.message);
        }
        return;
      }

      // Sucesso: não navegue manualmente.
      // O App.tsx possui o gate (onAuthStateChange) que vai enviar para o AppStack (HomeScreen).
      // Se quiser feedback, descomente:
      // Alert.alert("Bem-vindo!", "Login efetuado com sucesso.");

    } catch (e: any) {
      Alert.alert("Erro", "Não foi possível realizar o login no momento.");
    } finally {
      setLoading(false);
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
            autoCorrect={false}
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
  );
}
