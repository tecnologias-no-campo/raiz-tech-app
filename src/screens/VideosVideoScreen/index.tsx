// VideosVideoScreen.tsx
// Tela de vídeos da playlist com cache offline (AsyncStorage + NetInfo)

import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { styles } from "./styles";

// Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { VideoCard } from "../../components/VideoCard";
import { SecondaryTitle } from "../../components/SecondaryTitle";

// Types / API
import { VideoItem } from "../../types/videosVdType";
import { fetchPlaylistVideosWithDescription } from "../../services/youtubeClient";

// Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "VideosVideoScreen">;

type CachedPayload<T> = { savedAt: number; data: T };

// TTL do cache (24h)
const VIDEOS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

// Tamanho padrão (se mudar, muda a chave do cache também)
const PAGE_SIZE = 25;

export function VideosVideoScreen({ navigation, route }: Props) {
  const { idPlaylist, titlePlaylist } = route.params;

  const [videosPlaylist, setVideosPlaylist] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // Chave única do cache por playlist + page size
  const CACHE_KEY = useMemo(
    () => `yt:playlistItems:${idPlaylist}:pageSize=${PAGE_SIZE}`,
    [idPlaylist]
  );

  // Conectividade
  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => setIsOnline(!!s.isConnected));
    return () => unsub();
  }, []);

  // Bootstrap
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        if (isOnline) {
          await fetchAndCache();
        } else {
          const had = await readFromCache();
          if (!had) setError("Sem conexão e sem vídeos salvos para exibir.");
        }
      } catch (e: any) {
        const had = await readFromCache();
        if (!had) setError("Falha ao carregar os vídeos da playlist.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isOnline, idPlaylist, CACHE_KEY]);

  // Busca API + persiste
  async function fetchAndCache() {
    const apiVideos = await fetchPlaylistVideosWithDescription(idPlaylist, PAGE_SIZE);
    // Mapeia para VideoItem (já vem no formato certo, mas garantimos)
    const mapped: VideoItem[] = apiVideos.map((v) => ({
      title: v.title,
      description: v.description,
      thumbnailUrl: v.thumbnailUrl ?? "",
      videoId: v.videoId,
    }));

    setVideosPlaylist(mapped);
    setFromCache(false);
    setError(null);

    const payload: CachedPayload<VideoItem[]> = { savedAt: Date.now(), data: mapped };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    setLastUpdated(payload.savedAt);
  }

  // Lê do cache
  async function readFromCache(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    try {
      const payload = JSON.parse(raw) as CachedPayload<VideoItem[]>;
      setVideosPlaylist(payload.data || []);
      setFromCache(true);
      setLastUpdated(payload.savedAt ?? null);
      return (payload.data?.length ?? 0) > 0;
    } catch {
      return false;
    }
  }

  // Refetch manual (debug)
  async function refetchNow() {
    setLoading(true);
    try {
      await fetchAndCache();
    } catch {
      await readFromCache();
    } finally {
      setLoading(false);
    }
  }

  function formatLastUpdated(ts: number | null) {
    if (!ts) return null;
    const d = new Date(ts);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const isStale = lastUpdated ? Date.now() - lastUpdated > VIDEOS_CACHE_TTL_MS : false;

  // Loading
  if (loading) {
    return (
      <MainStructure>
        <MainHeader
          title="Vídeos"
          source={require("../../assets/images/icons/general/play-button-icon.png")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
          <Text style={{ marginTop: 10, color: "#333" }}>Carregando vídeos…</Text>
        </View>
      </MainStructure>
    );
  }

  // Erro sem cache válido
  if (error && videosPlaylist.length === 0) {
    return (
      <MainStructure>
        <MainHeader
          title="Vídeos"
          source={require("../../assets/images/icons/general/play-button-icon.png")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ color: "red", marginBottom: 15, textAlign: "center", fontWeight: "bold" }}>
            {error}
          </Text>
        </View>
      </MainStructure>
    );
  }

  // Conteúdo
  return (
    <MainStructure>
      <MainHeader
        title="Vídeos"
        source={require("../../assets/images/icons/general/play-button-icon.png")}
      />

      {/* Status/avisos */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {!!lastUpdated && (
          <Text style={{ fontSize: 12, color: isStale ? "#C47F00" : "#4CAF50" }}>
            {fromCache
              ? `Mostrando dados armazenados • Última atualização: ${formatLastUpdated(lastUpdated)}`
              : `Atualizado em: ${formatLastUpdated(lastUpdated)}`}
          </Text>
        )}
        {isOnline === false && (
          <Text style={{ fontSize: 12, color: "#999" }}>
            Sem conexão: exibindo vídeos salvos (se disponíveis).
          </Text>
        )}
        {!!error && videosPlaylist.length > 0 && (
          <Text style={{ fontSize: 12, color: "#C44747" }}>
            {error} — exibindo dados salvos.
          </Text>
        )}
        {__DEV__ && (
          <TouchableOpacity onPress={refetchNow} style={{ marginTop: 6, alignSelf: "flex-start" }}>
            <Text style={{ color: "#2e7d32", fontSize: 12 }}>↻ Atualizar agora</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.videoVideoScreen_secondaryTitle}>
        <SecondaryTitle title={titlePlaylist} color="#008000" />
      </View>

      <ScrollView
        contentContainerStyle={{
          marginTop: 30,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >
        {videosPlaylist.length === 0 ? (
          <Text style={{ color: "#555", textAlign: "center" }}>
            Nenhum vídeo para exibir.
          </Text>
        ) : (
          videosPlaylist.map((item, index) => (
            <VideoCard
              key={item.videoId || index}
              image={item.thumbnailUrl}
              title={item.title}
              text={item.description}
              onPress={() =>
                navigation.navigate("PlayVideoScreen", { videoId: item.videoId })
              }
            />
          ))
        )}
      </ScrollView>
    </MainStructure>
  );
}
