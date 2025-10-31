// SignUpScreen.tsx
// Tela de cadastro no aplicativo (e-mail + senha)

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

// Supabase (client com SecureStore)
import { supabase } from "../../services/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, "SignUpScreen">;

export function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSignUp() {
    const trimmedEmail = email.trim().toLowerCase();

    // Validações simples
    if (!trimmedEmail || !password) {
      Alert.alert("Campos obrigatórios", "Informe e-mail e senha.");
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("E-mail inválido", "Verifique o formato do e-mail informado.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
      });

      if (error) {
        const msg = (error.message || "").toLowerCase();
        if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
          Alert.alert("Erro no cadastro", "Este e-mail já está cadastrado.");
        } else {
          Alert.alert("Erro no cadastro", error.message);
        }
        return;
      }

      // Políticas do Supabase:
      // - Se exigir confirmação por e-mail, a sessão pode NÃO vir ativa ainda.
      // - Ainda assim, `data.user` existe (com ID) -> prossiga para coletar dados do perfil.
      const userId = data?.user?.id;
      if (userId) {
        Alert.alert(
          "Conta criada!",
          "Enviamos um e-mail para confirmação. Após confirmar, você poderá acessar normalmente."
        );
        navigation.navigate("SignUpFormScreen", { userId });
      } else {
        // Caso raro: sem userId — peça para tentar novamente
        Alert.alert("Atenção", "Não foi possível obter o usuário. Tente novamente em instantes.");
      }
    } catch (e: any) {
      Alert.alert("Erro", "Não foi possível criar a conta no momento.");
    } finally {
      setLoading(false);
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
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormField
            label="Senha"
            mainColor="#80A218"
            keyboardType="default"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <SimpleButton
            title={loading ? "Criando conta..." : "Continuar"}
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
