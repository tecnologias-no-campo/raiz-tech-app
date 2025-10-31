// screens/ForecastWeatherScreen/index.tsx
import React from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { FullWeatherCard } from "../../components/FullWeatherCard";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForecastWeather } from "../../hooks/useForecastWeather";

type Props = NativeStackScreenProps<RootStackParamList, "ForecastWeatherScreen">;

export function ForecastWeatherScreen({ route }: Props) {
  const { period } = route.params;
  const { daily, loading, error, fromCache, lastUpdated, isOnline, isStale } = useForecastWeather();

  // Datas dinâmicas
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  let dataToDisplay = daily;
  if (period === "today") dataToDisplay = daily.filter((d) => d.time?.startsWith(today));
  else if (period === "tomorrow") dataToDisplay = daily.filter((d) => d.time?.startsWith(tomorrow));

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

  if (loading) {
    return (
      <MainStructure>
        <MainHeader title="Carregando Previsão..." source={require("../../assets/images/icons/general/weather-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
        </View>
      </MainStructure>
    );
  }

  if (error && daily.length === 0) {
    return (
      <MainStructure>
        <MainHeader title="Erro no Clima" source={require("../../assets/images/icons/general/weather-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ color: "red", marginBottom: 15, textAlign: "center", fontWeight: "bold" }}>{error}</Text>
        </View>
      </MainStructure>
    );
  }

  return (
    <MainStructure>
      <MainHeader
        title={period === "today" ? "Hoje" : period === "tomorrow" ? "Amanhã" : "Próximos dias"}
        source={require("../../assets/images/icons/general/weather-icon.png")}
      />

      {/* Avisos de cache/conexão */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {!!lastUpdated && (
          <Text style={{ fontSize: 12, textAlign: 'center', color: isStale ? "#C47F00" : "#4CAF50" }}>
            {fromCache
              ? `Mostrando dados armazenados • Última atualização: ${formatLastUpdated(lastUpdated)}`
              : `Atualizado em: ${formatLastUpdated(lastUpdated)}`}
          </Text>
        )}
        {isOnline === false && <Text style={{ fontSize: 12, textAlign: 'center', color: "#999" }}>Sem conexão: exibindo dados salvos.</Text>}
        {!!error && daily.length > 0 && <Text style={{ fontSize: 12, color: "#C44747" }}>{error} — exibindo dados salvos.</Text>}
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
          const formatted = dateObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
          const weekday = dateObj.toLocaleDateString("pt-BR", { weekday: "long" });
          const dateWithWeekday = `${weekday[0].toUpperCase() + weekday.slice(1)} - ${formatted}`;

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
