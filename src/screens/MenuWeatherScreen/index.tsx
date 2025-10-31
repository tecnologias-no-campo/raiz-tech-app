// MenuWeatherScreen.tsx
// Tela de menu para acessar a previsão + realtime com cache offline (AsyncStorage + NetInfo)

import React, { useState, useEffect, useMemo } from "react";
import { View, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { styles } from "./styles";

// Types
import { WeatherRealtime } from "../../types/weatherRtType";

// Components
import { ImageTextButton } from "../../components/ImageTextButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";
import { StandardCard } from "../../components/StandardCard";
import { SecondaryWeatherCard } from "../../components/SecondaryWeatherCard";
import { SecondaryTitle } from "../../components/SecondaryTitle";

// Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "MenuWeatherScreen">;

type CachedPayload<T> = { savedAt: number; data: T };

// 1) API Key (via .env / app.config.*)
const TOMORROW_API_KEY = process.env.EXPO_PUBLIC_TOMORROW_API_KEY;

// 2) Localização (pode vir de props futuramente)
const location = "-25.2419,-50.7719";

// 3) TTL do cache (realtime) — 10 min
const REALTIME_CACHE_TTL_MS = 10 * 60 * 1000;

export function MenuWeatherScreen({ navigation }: Props) {
  // Dimensões responsivas
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.9;

  const [values, setValues] = useState<WeatherRealtime["data"]["values"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  // URL e cache key reativas (se mudar localização/chave, muda tudo)
  const WEATHER_URL = useMemo(
    () =>
      `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${TOMORROW_API_KEY}&units=metric`,
    [location, TOMORROW_API_KEY]
  );
  const CACHE_KEY = useMemo(() => `weather:realtime:${location}:metric`, [location]);

  // Conectividade
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => setIsOnline(!!state.isConnected));
    return () => unsub();
  }, []);

  // Bootstrap
  useEffect(() => {
    (async () => {
      if (!TOMORROW_API_KEY) {
        const had = await readFromCache();
        if (!had) setError("Chave da API Tomorrow.io não encontrada. Verifique seu .env e app.config.js");
        setIsLoading(false);
        return;
      }

      try {
        if (isOnline) {
          await fetchAndCache();
        } else {
          const had = await readFromCache();
          if (!had) setError("Sem conexão e sem dados salvos para exibir.");
        }
      } catch (e) {
        const had = await readFromCache();
        if (!had) setError("Falha ao buscar dados do clima. Verifique sua conexão.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isOnline, WEATHER_URL, CACHE_KEY]);

  async function fetchAndCache() {
    const res = await fetch(WEATHER_URL);

    // Trata rate limit
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(
        retryAfter
          ? `Limite de requisições. Tente de novo em ${retryAfter}s.`
          : "Limite de requisições atingido. Tente novamente em alguns minutos."
      );
    }

    if (!res.ok) {
      let msg = "";
      try {
        const body = await res.json();
        msg = body?.message || res.statusText;
      } catch {
        msg = res.statusText;
      }
      throw new Error(`Erro na API: ${msg}`);
    }

    const json = (await res.json()) as WeatherRealtime;

    setValues(json.data.values);
    setError(null);
    setFromCache(false);

    const payload: CachedPayload<WeatherRealtime["data"]["values"]> = {
      savedAt: Date.now(),
      data: json.data.values,
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    setLastUpdated(payload.savedAt);
  }

  async function readFromCache(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    try {
      const payload = JSON.parse(raw) as CachedPayload<WeatherRealtime["data"]["values"]>;
      setValues(payload.data || null);
      setLastUpdated(payload.savedAt || null);
      setFromCache(true);
      return !!payload.data;
    } catch {
      return false;
    }
  }

  async function refetchNow() {
    setIsLoading(true);
    try {
      await fetchAndCache();
    } catch {
      await readFromCache();
    } finally {
      setIsLoading(false);
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

  const isStale = lastUpdated ? Date.now() - lastUpdated > REALTIME_CACHE_TTL_MS : false;

  // Loading
  if (isLoading) {
    return (
      <MainStructure>
        <MainHeader title="Clima" source={require("../../assets/images/icons/general/weather-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
          <Text style={{ marginTop: 10, color: "#333" }}>Carregando dados do clima...</Text>
        </View>
      </MainStructure>
    );
  }

  // Erro sem cache válido
  if ((error || !values) && !fromCache) {
    return (
      <MainStructure>
        <MainHeader title="Clima" source={require("../../assets/images/icons/general/weather-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ color: "red", marginBottom: 15, textAlign: "center", fontWeight: "bold" }}>{error}</Text>
          <Text style={{ textAlign: "center", color: "#555" }}>
            Verifique sua conexão ou se a chave da API no .env está correta e reinicie o app.
          </Text>
        </View>
      </MainStructure>
    );
  }

  // Conteúdo
  return (
    <MainStructure>
      <MainHeader title="Clima" source={require("../../assets/images/icons/general/weather-icon.png")} />

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
          <Text style={{ fontSize: 12, color: "#999" }}>Sem conexão: exibindo dados salvos (se disponíveis).</Text>
        )}
        {!!error && values && (
          <Text style={{ fontSize: 12, color: "#C44747" }}>{error} — exibindo dados salvos.</Text>
        )}

        {/* Botão de debug (opcional) */}
        {__DEV__ && (
          <TouchableOpacity onPress={refetchNow} style={{ marginTop: 6, alignSelf: "flex-start" }}>
            <Text style={{ color: "#2e7d32", fontSize: 12 }}>↻ Atualizar agora</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <StandardCard
          borderColor="#008000"
          borderWidth={3}
          width={cardWidth}
          height={250}
          style={[{ justifyContent: "center", paddingVertical: 20, marginVertical: 20 }]}
        >
          <SecondaryTitle title="AGORA" color="#008000" />
          <ScrollView style={{ width: cardWidth }}>
            <View style={styles.containerAlignSecondary}>
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/percentage-icon.png")}
                text="Temperatura"
                data={`${values?.temperature?.toFixed?.(1) ?? "--"}°C`}
                width="45%"
                height={90}
              />
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/percentage-icon.png")}
                text="Temperatura Aparente"
                data={`${values?.temperatureApparent?.toFixed?.(1) ?? "--"}°C`}
                width="45%"
                height={90}
              />
            </View>

            <View style={styles.containerAlignSecondary}>
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/humidity-icon.png")}
                text="Humidade Relativa"
                data={`${values?.humidity ?? "--"}%`}
                width="45%"
                height={90}
              />
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/cloud-icon.png")}
                text="Cobertura de Nuvens"
                data={`${values?.cloudCover ?? "--"}%`}
                width="45%"
                height={90}
              />
            </View>

            <View style={styles.containerAlignSecondary}>
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/percentage-icon.png")}
                text="Probabilidade de chuva"
                data={`${values?.precipitationProbability ?? "--"}%`}
                width="45%"
                height={90}
              />
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/wind-icon.png")}
                text="Velocidade do vento"
                data={`${values?.windSpeed ?? "--"} km/h`}
                width="45%"
                height={90}
              />
            </View>

            <View style={styles.containerAlignSecondary}>
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/wind-icon.png")}
                text="Direção do vento"
                data={`${values?.windDirection ?? "--"}°`}
                width="45%"
                height={90}
              />
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/percentage-icon.png")}
                text="Índice UV"
                data={`${values?.uvIndex ?? "--"}`}
                width="45%"
                height={90}
              />
            </View>

            <View style={styles.containerAlignSecondary}>
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/percentage-icon.png")}
                text="Visibilidade"
                data={`${values?.visibility ?? "--"} km`}
                width="45%"
                height={90}
              />
              <SecondaryWeatherCard
                icon={require("../../assets/images/icons/weather/percentage-icon.png")}
                text="Intensidade da chuva"
                data={`${values?.rainIntensity ?? "--"} mm/h`}
                width="45%"
                height={90}
              />
            </View>
          </ScrollView>
        </StandardCard>

        <ImageTextButton
          source={require("../../assets/images/icons/weather/calendar-icon.png")}
          text="hoje"
          mainColor="#80A218"
          variant="secondary"
          onPress={() => navigation.navigate("ForecastWeatherScreen", { period: "today" })}
        />

        <ImageTextButton
          source={require("../../assets/images/icons/weather/calendar-icon.png")}
          text="amanhã"
          mainColor="#80A218"
          variant="secondary"
          onPress={() => navigation.navigate("ForecastWeatherScreen", { period: "tomorrow" })}
        />

        <ImageTextButton
          source={require("../../assets/images/icons/weather/calendar-icon.png")}
          text="próximos dias"
          mainColor="#80A218"
          variant="secondary"
          onPress={() => navigation.navigate("ForecastWeatherScreen", { period: "nextdays" })}
        />
      </View>
    </MainStructure>
  );
}
