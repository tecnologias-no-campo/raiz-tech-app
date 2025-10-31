// ForecastWeatherScreen.tsx
// Tela de previsão com cache offline (AsyncStorage + NetInfo)

import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { FullWeatherCard } from "../../components/FullWeatherCard";

import { ForecastWeatherData, ForecastDay } from "../../types/weatherForecastType";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// 1) API Key (via .env / app.config.js)
const TOMORROW_API_KEY = process.env.EXPO_PUBLIC_TOMORROW_API_KEY;

// 2) Localização (pode vir de props no futuro)
const location = "-25.2419,-50.7719";

// 3) TTL do cache (30 minutos)
const CACHE_TTL_MS = 30 * 60 * 1000;

type Props = NativeStackScreenProps<RootStackParamList, "ForecastWeatherScreen">;

type CachedPayload<T> = {
  savedAt: number; // epoch ms
  data: T;
};

export function ForecastWeatherScreen({ route }: Props) {
  const { period } = route.params;

  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  // URL da API (timesteps diários, unidades métricas)
  const FORECAST_URL = useMemo(() => {
    return `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1d&units=metric&apikey=${TOMORROW_API_KEY}`;
  }, []);

  // Chave única do cache (se mudar localização/timesteps, muda a chave)
  const CACHE_KEY = useMemo(() => `weather:forecast:${location}:1d:metric`, []);

  // Datas dinâmicas para filtro
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  // Observa conectividade
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    (async () => {
      if (!TOMORROW_API_KEY) {
        // Sem chave, tenta pelo menos o cache
        const hadCache = await readFromCache();
        if (!hadCache) {
          setError("Chave da API Tomorrow.io não encontrada.");
        }
        setIsLoading(false);
        return;
      }

      // Estratégia:
      // 1) Se online -> tenta buscar. Se OK, salva no cache e exibe.
      // 2) Se falhar (ou estiver offline) -> tenta ler do cache.
      try {
        if (isOnline) {
          await fetchAndCache();
        } else {
          const hadCache = await readFromCache();
          if (!hadCache) {
            setError("Sem conexão e sem dados salvos para exibir.");
          }
        }
      } catch (e: any) {
        // Falha ao buscar online — tenta cache
        const hadCache = await readFromCache();
        if (!hadCache) {
          setError("Falha ao buscar dados do clima. Verifique sua conexão.");
        }
      } finally {
        setIsLoading(false);
      }
    })();
    // Reexecuta quando o estado online muda (útil ao voltar a ter internet)
  }, [isOnline]);

  async function fetchAndCache() {
    const res = await fetch(FORECAST_URL);
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
    const json = (await res.json()) as ForecastWeatherData;

    const daily = json?.timelines?.daily ?? [];
    setForecast(daily);
    setError(null);
    setFromCache(false);

    const payload: CachedPayload<ForecastDay[]> = {
      savedAt: Date.now(),
      data: daily,
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    setLastUpdated(payload.savedAt);
  }

  async function readFromCache(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return false;

    try {
      const payload = JSON.parse(raw) as CachedPayload<ForecastDay[]>;
      setForecast(payload.data || []);
      setLastUpdated(payload.savedAt || null);
      setFromCache(true);

      // Se o cache estiver “velho”, podemos avisar — mas ainda exibimos
      if (payload.savedAt && Date.now() - payload.savedAt > CACHE_TTL_MS) {
        // Mantém dados, apenas sinaliza que pode estar desatualizado
        // (você pode alterar a cor do aviso abaixo)
      }
      return true;
    } catch {
      return false;
    }
  }

  // Filtra de acordo com o período
  let dataToDisplay: ForecastDay[] = [];
  if (period === "today") {
    dataToDisplay = forecast.filter((d) => d.time?.startsWith(today));
  } else if (period === "tomorrow") {
    dataToDisplay = forecast.filter((d) => d.time?.startsWith(tomorrow));
  } else {
    dataToDisplay = forecast;
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

  const isStale = lastUpdated ? Date.now() - lastUpdated > CACHE_TTL_MS : false;

  // Loading
  if (isLoading) {
    return (
      <MainStructure>
        <MainHeader
          title="Carregando Previsão..."
          source={require("../../assets/images/icons/general/weather-icon.png")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
        </View>
      </MainStructure>
    );
  }

  // Erro sem cache válido
  if (error && forecast.length === 0) {
    return (
      <MainStructure>
        <MainHeader
          title="Erro no Clima"
          source={require("../../assets/images/icons/general/weather-icon.png")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ color: "red", marginBottom: 15, textAlign: "center", fontWeight: "bold" }}>
            {error}
          </Text>
        </View>
      </MainStructure>
    );
  }

  return (
    <MainStructure>
      <MainHeader
        title={
          period === "today" ? "Hoje" : period === "tomorrow" ? "Amanhã" : "Próximos dias"
        }
        source={require("../../assets/images/icons/general/weather-icon.png")}
      />

      {/* Avisos de cache/conexão */}
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
            Sem conexão: exibindo dados salvos (se disponíveis).
          </Text>
        )}
        {!!error && forecast.length > 0 && (
          <Text style={{ fontSize: 12, color: "#C44747" }}>
            {error} — exibindo dados salvos.
          </Text>
        )}
      </View>

      <ScrollView style={{ marginTop: 12 }}>
        {dataToDisplay.length === 0 && (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#555", fontSize: 16, textAlign: "center" }}>
              Não há dados de previsão para o período selecionado.
            </Text>
          </View>
        )}

        {dataToDisplay.map((day, index) => {
          const dateObj = new Date(day.time.split("T")[0] + "T00:00:00");
          const formatteDate = dateObj.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          const weekday = dateObj.toLocaleDateString("pt-BR", { weekday: "long" });
          const dateWithWeekday = `${weekday[0].toUpperCase() + weekday.slice(1)} - ${formatteDate}`;

          return (
            <FullWeatherCard
              key={index}
              date={dateWithWeekday}
              max={day.values.temperatureMax}
              min={day.values.temperatureMin}
              weatherCode={day.values.weatherCodeMax}
              evapotranspiration={day.values.evapotranspirationAvg}
              probabilityRain={day.values.precipitationProbabilityAvg}
              wind={day.values.windSpeedAvg}
              humidity={day.values.humidityAvg}
              cloud={day.values.cloudCoverAvg}
              visibility={day.values.visibilityAvg}
            />
          );
        })}
      </ScrollView>
    </MainStructure>
  );
}
