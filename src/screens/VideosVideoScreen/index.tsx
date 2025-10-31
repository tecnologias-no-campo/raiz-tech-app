// screens/VideosVideoScreen.tsx
import React from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { VideoCard } from "../../components/VideoCard";
import { SecondaryTitle } from "../../components/SecondaryTitle";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useYouTubePlaylistVideos } from "../../hooks/useYouTubePlaylistVideos";

type Props = NativeStackScreenProps<RootStackParamList, "VideosVideoScreen">;

export function VideosVideoScreen({ navigation, route }: Props) {
  const { idPlaylist, titlePlaylist } = route.params;
  const { videos, loading, error, fromCache, lastUpdated, isOnline, isStale } = useYouTubePlaylistVideos(idPlaylist, 25);

  function format(ts: number | null) {
    if (!ts) return null;
    const d = new Date(ts);
    return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  if (loading) {
    return (
      <MainStructure>
        <MainHeader title="Vídeos" source={require("../../assets/images/icons/general/play-button-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
          <Text style={{ marginTop: 10, color: "#333" }}>Carregando vídeos…</Text>
        </View>
      </MainStructure>
    );
  }

  if (error && videos.length === 0) {
    return (
      <MainStructure>
        <MainHeader title="Vídeos" source={require("../../assets/images/icons/general/play-button-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ color: "red", marginBottom: 15, textAlign: "center", fontWeight: "bold" }}>{error}</Text>
        </View>
      </MainStructure>
    );
  }

  return (
    <MainStructure>
      <MainHeader title="Vídeos" source={require("../../assets/images/icons/general/play-button-icon.png")} />

      <View style={styles.videoVideoScreen_secondaryTitle}>
        <SecondaryTitle title={titlePlaylist} color="#008000" />
      </View>

      {/* status/avisos */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {!!lastUpdated && (
          <Text style={{ fontSize: 12, textAlign: "center", color: isStale ? "#C47F00" : "#4CAF50" }}>
            {fromCache ? `Mostrando dados armazenados • Última atualização: ${format(lastUpdated)}`
                       : `Atualizado em: ${format(lastUpdated)}`}
          </Text>
        )}
        {isOnline === false && <Text style={{ fontSize: 12, textAlign: "center", color: "#999" }}>Sem conexão: exibindo vídeos salvos.</Text>}
        {!!error && videos.length > 0 && <Text style={{ fontSize: 12, textAlign: "center", color: "#C44747" }}>{error} — exibindo dados salvos.</Text>}
      </View>

      <ScrollView contentContainerStyle={{ marginTop: 30, paddingHorizontal: 16, paddingBottom: 40 }}>
        {videos.length === 0 ? (
          <Text style={{ color: "#555", textAlign: "center" }}>Nenhum vídeo para exibir.</Text>
        ) : (
          videos.map((item, index) => (
            <VideoCard
              key={item.videoId || index}
              image={item.thumbnailUrl}
              title={item.title}
              text={item.description}
              onPress={() => navigation.navigate("PlayVideoScreen", { videoId: item.videoId })}
            />
          ))
        )}
      </ScrollView>
    </MainStructure>
  );
}
