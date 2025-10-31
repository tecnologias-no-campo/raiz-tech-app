// ProfileScreen.tsx
// Tela que apresenta o perfil do usuário, trazendo também os seus dados de cadastro

import React, { useEffect, useState, useMemo } from "react";
import { View, Dimensions, ScrollView, Alert } from "react-native";
import { styles } from "./styles";

// Components
import { StandardCard } from "../../components/StandardCard";
import { MainText } from "../../components/MainText";
import { SimpleButton } from "../../components/SimpleButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";
import { SecondaryTitle } from "../../components/SecondaryTitle";

// Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Supabase (client seguro)
import { supabase } from "../../services/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;

interface Produtor {
  id: string;
  user_id: string;
  nome_completo: string | null;
  nome_fazenda: string | null;
  cidade: string | null;
  area_total_ha: number | null;
  tipo_producao: string | null;
  principal_produto: string | null;
  numero_trabalhadores: number | null;
  nivel_tecnologia: string | null;
}

export function ProfileScreen({ navigation }: Props) {
  const [produtor, setProdutor] = useState<Produtor | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Dimensões responsivas
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.9;

  useEffect(() => {
    (async () => {
      setLoading(true);
      // 1) Usuário logado
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user?.id) {
        Alert.alert("Sessão", "Não foi possível carregar o usuário logado.");
        setLoading(false);
        return;
      }
      const uid = userData.user.id;
      setUserId(uid);

      // 2) Registro do produtor (pode não existir ainda)
      const { data, error } = await supabase
        .from("produtores")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();

      if (error) {
        console.warn("Erro ao carregar perfil:", error);
        Alert.alert("Perfil", "Não foi possível carregar os dados do perfil.");
      } else {
        setProdutor((data as Produtor) ?? null);
      }
      setLoading(false);
    })();
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Erro ao sair", error.message);
      return;
    }
    // O App.tsx já alterna para AuthStack via onAuthStateChange.
    // Se quiser manter um fallback explícito, descomente:
    // navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
  }

  // Helpers de exibição
  const areaTotalStr = useMemo(
    () =>
      produtor?.area_total_ha != null
        ? `${produtor.area_total_ha}`.replace(".", ",")
        : "—",
    [produtor?.area_total_ha]
  );
  const nTrabStr = useMemo(
    () =>
      produtor?.numero_trabalhadores != null
        ? String(produtor.numero_trabalhadores)
        : "—",
    [produtor?.numero_trabalhadores]
  );

  return (
    <MainStructure>
      <MainHeader
        title="Perfil"
        source={require("../../assets/images/icons/general/person-icon.png")}
      />

      <View style={styles.profileScreen_container}>
        <StandardCard
          borderColor="#80A218"
          width={cardWidth}
          borderWidth={3}
          height={"50%"}
        >
          <ScrollView>
            <View style={styles.profileScreen_headerProfile}>
              <SecondaryTitle
                title={produtor?.nome_completo || "Usuário"}
                color="#F0B705"
              />
            </View>

            {loading ? (
              <MainText
                color="#636363"
                style={{ textAlign: "center", marginTop: 20 }}
              >
                Carregando dados do perfil...
              </MainText>
            ) : produtor ? (
              <View style={styles.profileScreen_contentProfile}>
                <MainText
                  style={styles.profileScreen_contentProfile_item}
                  color="#636363"
                >
                  Fazenda: {produtor.nome_fazenda || "—"}
                </MainText>
                <MainText
                  style={styles.profileScreen_contentProfile_item}
                  color="#636363"
                >
                  Local: {produtor.cidade || "—"}
                </MainText>
                <MainText
                  style={styles.profileScreen_contentProfile_item}
                  color="#636363"
                >
                  Área total: {areaTotalStr}
                </MainText>
                <MainText
                  style={styles.profileScreen_contentProfile_item}
                  color="#636363"
                >
                  Tipo da produção: {produtor.tipo_producao || "—"}
                </MainText>
                <MainText
                  style={styles.profileScreen_contentProfile_item}
                  color="#636363"
                >
                  Principal Produto: {produtor.principal_produto || "—"}
                </MainText>
                <MainText
                  style={styles.profileScreen_contentProfile_item}
                  color="#636363"
                >
                  Nº de trabalhadores: {nTrabStr}
                </MainText>
                <MainText
                  style={styles.profileScreen_contentProfile_item}
                  color="#636363"
                >
                  Nível de tecnologia: {produtor.nivel_tecnologia || "—"}
                </MainText>
              </View>
            ) : (
              <MainText
                color="#636363"
                style={{ textAlign: "center", marginTop: 20 }}
              >
                Você ainda não preencheu seu cadastro.
              </MainText>
            )}
          </ScrollView>
        </StandardCard>

        <SimpleButton
          title="Sair do app"
          mainColor="#FF3131"
          variant="primary"
          onPress={handleSignOut}
        />

        <SimpleButton
          title="Atualizar cadastro"
          mainColor="#80A218"
          variant="primary"
          onPress={() => {
            if (!userId) {
              Alert.alert("Erro", "Usuário não identificado.");
              return;
            }
            navigation.navigate("SignUpFormScreen", { userId });
          }}
        />
      </View>
    </MainStructure>
  );
}
