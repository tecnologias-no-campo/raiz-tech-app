// MenuVideoScreen.tsx
// Tela de menu de vídeos (YouTube) com cache offline (AsyncStorage + NetInfo)

import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { PlaylistButton } from "../../components/PlaylistButton";

import { fetchChannelPlaylists } from "../../services/youtubeClient";
import { PlaylistItem } from "../../types/videosPlType";

import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "MenuVideoScreen">;

type CachedPayload<T> = { savedAt: number; data: T };

// ⚙️ TTL do cache: 24h
const PLAYLISTS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

// 🔐 Se você tiver o CHANNEL_ID disponível em algum lugar, inclua-o na chave
const CHANNEL_ID = process.env.EXPO_PUBLIC_YT_CHANNEL_ID ?? "default";

export function MenuVideoScreen({ navigation }: Props) {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // 🔑 chave única do cache (inclui channel id se houver)
  const CACHE_KEY = useMemo(() => `yt:playlists:${CHANNEL_ID}`, []);

  // 👂 conectividade
  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => setIsOnline(!!s.isConnected));
    return () => unsub();
  }, []);

  // ▶️ bootstrap
  useEffect(() => {
    (async () => {
      try {
        if (isOnline) {
          await fetchAndCache();
        } else {
          const had = await readFromCache();
          if (!had) setError("Sem conexão e sem playlists salvas para exibir.");
        }
      } catch (e: any) {
        const had = await readFromCache();
        if (!had) setError("Falha ao carregar playlists do YouTube.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isOnline]);

  // 🌐 busca do YouTube + persiste no cache
  async function fetchAndCache() {
    const data = await fetchChannelPlaylists(); // sua função já retorna PlaylistItem[]
    // opcional: validar tipo/estrutura aqui
    setPlaylists(data);
    setFromCache(false);
    setError(null);

    const payload: CachedPayload<PlaylistItem[]> = {
      savedAt: Date.now(),
      data,
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    setLastUpdated(payload.savedAt);
  }

  // 📦 tenta ler do cache
  async function readFromCache(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    try {
      const payload = JSON.parse(raw) as CachedPayload<PlaylistItem[]>;
      setPlaylists(payload.data || []);
      setFromCache(true);
      setLastUpdated(payload.savedAt ?? null);
      return (payload.data?.length ?? 0) > 0;
    } catch {
      return false;
    }
  }

  // 🔄 botão de debug (apenas dev)
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

  const isStale = lastUpdated ? Date.now() - lastUpdated > PLAYLISTS_CACHE_TTL_MS : false;

  // ⏳ Loading
  if (loading) {
    return (
      <MainStructure>
        <MainHeader
          title="VÍDEOS"
          source={require("../../assets/images/icons/general/play-button-icon.png")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
          <Text style={{ marginTop: 10, color: "#333" }}>Carregando playlists…</Text>
        </View>
      </MainStructure>
    );
  }

  // ❌ Erro sem cache válido
  if (error && playlists.length === 0) {
    return (
      <MainStructure>
        <MainHeader
          title="VÍDEOS"
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

  // ✅ Conteúdo (online ou cache)
  return (
    <MainStructure>
      <MainHeader
        title="VÍDEOS"
        source={require("../../assets/images/icons/general/play-button-icon.png")}
      />

      {/* status/avisos */}
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
            Sem conexão: exibindo playlists salvas (se disponíveis).
          </Text>
        )}
        {!!error && playlists.length > 0 && (
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

      <ScrollView
        contentContainerStyle={{
          marginTop: 10,
          paddingTop: 30,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >
        {playlists.length === 0 ? (
          <Text style={{ color: "#555", textAlign: "center" }}>
            Nenhuma playlist para exibir.
          </Text>
        ) : (
          playlists.map((item) => (
            <PlaylistButton
              key={item.id}
              text={item.title}
              onPress={() =>
                navigation.navigate("VideosVideoScreen", {
                  idPlaylist: item.id,
                  titlePlaylist: item.title,
                })
              }
            />
          ))
        )}
      </ScrollView>
    </MainStructure>
  );
}
