// SignUpFormScreen.tsx
// Tela que apresenta o formulário de cadastro com informações pessoais dos produtores

import React, { useEffect, useMemo, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { styles } from "./styles";

// Componentes
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";
import { FormField } from "../../components/FormField";
import { DropDownMenu } from "../../components/DropDownMenu";

// Navegação
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Supabase (client seguro com SecureStore)
import { supabase } from "../../services/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, "SignUpFormScreen">;

export function SignUpFormScreen({ navigation, route }: Props) {
  // Se não vier da rota, pegamos do usuário logado
  const routeUserId = route.params?.userId ?? null;

  const [userId, setUserId] = useState<string | null>(routeUserId);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [fazenda, setFazenda] = useState("");
  const [cidade, setCidade] = useState("");
  const [areaTotal, setAreaTotal] = useState(""); // string para input
  const [tipoProducao, setTipoProducao] = useState("");
  const [principalProduto, setPrincipalProduto] = useState("");
  const [numeroTrabalhadores, setNumeroTrabalhadores] = useState("");
  const [nivelTecnologia, setNivelTecnologia] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Opções (evita recriar array a cada render)
  const producaoOptions = useMemo(
    () => [
      "Agrícola",
      "Pecuária",
      "Agropecuária",
      "Leiteira",
      "Avicultura",
      "Suinocultura",
      "Apicultura (abelhas)",
      "Piscultura (peixes)",
      "Agroindustrial",
      "Outros",
    ],
    []
  );

  const nivelOptions = useMemo(() => ["Básico", "Médio", "Avançado"], []);

  // Resolve userId caso não venha pela rota
  useEffect(() => {
    (async () => {
      if (userId) return; // já temos

      const { data, error } = await supabase.auth.getUser();
      if (error) {
        Alert.alert("Sessão", "Você precisa estar logado para completar o cadastro.");
        navigation.replace("SignInScreen");
        return;
      }
      const uid = data.user?.id ?? null;
      if (!uid) {
        Alert.alert("Sessão", "Não foi possível identificar o usuário logado.");
        navigation.replace("SignInScreen");
        return;
      }
      setUserId(uid);
    })();
  }, [userId, navigation]);

  // Carrega dados existentes do produtor (modo edição)
  useEffect(() => {
    if (!userId) return;

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("produtores")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.warn("Erro ao carregar produtor:", error);
      } else if (data) {
        setIsEditing(true);
        setNomeCompleto(data.nome_completo ?? "");
        setFazenda(data.nome_fazenda ?? "");
        setCidade(data.cidade ?? "");
        setAreaTotal(
          data.area_total_ha !== null && data.area_total_ha !== undefined
            ? String(data.area_total_ha)
            : ""
        );
        setTipoProducao(data.tipo_producao ?? "");
        setPrincipalProduto(data.principal_produto ?? "");
        setNumeroTrabalhadores(
          data.numero_trabalhadores !== null && data.numero_trabalhadores !== undefined
            ? String(data.numero_trabalhadores)
            : ""
        );
        setNivelTecnologia(data.nivel_tecnologia ?? "");
      }
      setLoading(false);
    })();
  }, [userId]);

  // Conversores numéricos tolerantes (aceita vírgula)
  function toNumberOrNull(s: string): number | null {
    if (!s) return null;
    const normalized = s.replace(",", ".").trim();
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }

  async function handleSubmit() {
    if (!userId) {
      Alert.alert("Sessão", "Não foi possível identificar o usuário. Faça login novamente.");
      return;
    }

    // Validações simples
    if (!nomeCompleto.trim()) {
      Alert.alert("Dados incompletos", "Informe seu nome completo.");
      return;
    }
    if (!cidade.trim()) {
      Alert.alert("Dados incompletos", "Informe a cidade.");
      return;
    }
    // Demais campos podem ser opcionais — ajuste conforme regra do seu app

    const payload = {
      user_id: userId,
      nome_completo: nomeCompleto.trim(),
      nome_fazenda: fazenda.trim() || null,
      cidade: cidade.trim(),
      area_total_ha: toNumberOrNull(areaTotal),
      tipo_producao: tipoProducao || null,
      principal_produto: principalProduto || null,
      numero_trabalhadores: toNumberOrNull(numeroTrabalhadores),
      nivel_tecnologia: nivelTecnologia || null,
    };

    setLoading(true);
    try {
      // Requer índice único em produtores.user_id para onConflict funcionar bem.
      // Supabase SQL recomendado:
      //   alter table produtores add constraint produtores_user_id_key unique (user_id);
      const { error } = await supabase.from("produtores").upsert(payload, { onConflict: "user_id" });

      if (error) {
        console.error("upsert produtores error:", error);
        Alert.alert("Erro ao salvar", "Não foi possível salvar os dados. Tente novamente.");
        return;
      }

      Alert.alert("Sucesso!", "Seus dados foram salvos.");
      navigation.navigate("HomeScreen");
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Falha inesperada ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.signUpScreen_container}>
      <LoginStructure>
        <ScrollView contentContainerStyle={styles.signUpScreen_form}>
          <FormField
            label="Nome completo"
            mainColor="#80A218"
            keyboardType="default"
            onChangeText={setNomeCompleto}
            value={nomeCompleto}
          />
          <FormField
            label="Fazenda"
            mainColor="#80A218"
            keyboardType="default"
            onChangeText={setFazenda}
            value={fazenda}
          />
          <FormField
            label="Cidade"
            mainColor="#80A218"
            keyboardType="default"
            onChangeText={setCidade}
            value={cidade}
          />
          <FormField
            label="Área total (hectares)"
            mainColor="#80A218"
            keyboardType="numeric"
            onChangeText={setAreaTotal}
            value={areaTotal}
          />

          <DropDownMenu
            titulo="Tipo da produção"
            mainColor="#80A218"
            options={producaoOptions}
            onSelect={setTipoProducao}
            // Se o seu DropDownMenu aceitar "value" para pré-selecionar, passe:
            // value={tipoProducao}
          />

          <FormField
            label="Principal produto"
            mainColor="#80A218"
            keyboardType="default"
            onChangeText={setPrincipalProduto}
            value={principalProduto}
          />

          <FormField
            label="Número de trabalhadores"
            mainColor="#80A218"
            keyboardType="numeric"
            onChangeText={setNumeroTrabalhadores}
            value={numeroTrabalhadores}
          />

          <DropDownMenu
            titulo="Nível de Tecnologia"
            mainColor="#80A218"
            options={nivelOptions}
            onSelect={setNivelTecnologia}
            // Se aceitar "value":
            // value={nivelTecnologia}
          />

          <SimpleButton
            title={loading ? "Salvando..." : isEditing ? "Salvar alterações" : "Registrar-se"}
            mainColor="#80A218"
            variant="primary"
            onPress={handleSubmit}
            disabled={loading}
          />
        </ScrollView>
      </LoginStructure>
    </View>
  );
}
