// screens/MenuVideoScreen.tsx
import React from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { PlaylistButton } from "../../components/PlaylistButton";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useYouTubePlaylists } from "../../hooks/useYouTubePlaylists";

type Props = NativeStackScreenProps<RootStackParamList, "MenuVideoScreen">;

export function MenuVideoScreen({ navigation }: Props) {
  const { playlists, loading, error, fromCache, lastUpdated, isOnline, isStale } = useYouTubePlaylists();

  function format(ts: number | null) {
    if (!ts) return null;
    const d = new Date(ts);
    return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  if (loading) {
    return (
      <MainStructure>
        <MainHeader title="VÍDEOS" source={require("../../assets/images/icons/general/play-button-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
          <Text style={{ marginTop: 10, color: "#333" }}>Carregando playlists…</Text>
        </View>
      </MainStructure>
    );
  }

  if (error && playlists.length === 0) {
    return (
      <MainStructure>
        <MainHeader title="VÍDEOS" source={require("../../assets/images/icons/general/play-button-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ color: "red", marginBottom: 15, textAlign: "center", fontWeight: "bold" }}>{error}</Text>
        </View>
      </MainStructure>
    );
  }

  return (
    <MainStructure>
      <MainHeader title="VÍDEOS" source={require("../../assets/images/icons/general/play-button-icon.png")} />

      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {!!lastUpdated && (
          <Text style={{ fontSize: 12, textAlign: "center", color: isStale ? "#C47F00" : "#4CAF50" }}>
            {fromCache ? `Mostrando dados armazenados • Última atualização: ${format(lastUpdated)}`
                       : `Atualizado em: ${format(lastUpdated)}`}
          </Text>
        )}
        {isOnline === false && <Text style={{ fontSize: 12, textAlign: "center", color: "#999" }}>Sem conexão: exibindo playlists salvas.</Text>}
        {!!error && playlists.length > 0 && <Text style={{ fontSize: 12, textAlign: "center", color: "#C44747" }}>{error} — exibindo dados salvos.</Text>}
      </View>

      <ScrollView contentContainerStyle={{ marginTop: 10, paddingTop: 30, paddingHorizontal: 16, paddingBottom: 40 }}>
        {playlists.length === 0 ? (
          <Text style={{ color: "#555", textAlign: "center" }}>Nenhuma playlist para exibir.</Text>
        ) : (
          playlists.map((item) => (
            <PlaylistButton
              key={item.id}
              text={item.title}
              onPress={() => navigation.navigate("VideosVideoScreen", { idPlaylist: item.id, titlePlaylist: item.title })}
            />
          ))
        )}
      </ScrollView>
    </MainStructure>
  );
}
