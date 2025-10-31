// screens/MenuWeatherScreen/index.tsx
import React from "react";
import { View, Dimensions, ScrollView, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { ImageTextButton } from "../../components/ImageTextButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";
import { StandardCard } from "../../components/StandardCard";
import { SecondaryWeatherCard } from "../../components/SecondaryWeatherCard";
import { SecondaryTitle } from "../../components/SecondaryTitle";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRealtimeWeather } from "../../hooks/useRealtimeWeather";

type Props = NativeStackScreenProps<RootStackParamList, "MenuWeatherScreen">;

export function MenuWeatherScreen({ navigation }: Props) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.9;

  const { values, loading, error, fromCache, lastUpdated, isOnline, isStale } = useRealtimeWeather();

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
        <MainHeader title="Clima" source={require("../../assets/images/icons/general/weather-icon.png")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#008000" />
          <Text style={{ marginTop: 10, color: "#333" }}>Carregando dados do clima...</Text>
        </View>
      </MainStructure>
    );
  }

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

  return (
    <MainStructure>
      <MainHeader title="Clima" source={require("../../assets/images/icons/general/weather-icon.png")} />

      {/* Status/avisos */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {!!lastUpdated && (
          <Text style={{ fontSize: 12, textAlign: "center", color: isStale ? "#C47F00" : "#4CAF50" }}>
            {fromCache
              ? `Mostrando dados armazenados • Última atualização: ${formatLastUpdated(lastUpdated)}`
              : `Atualizado em: ${formatLastUpdated(lastUpdated)}`}
          </Text>
        )}
        {isOnline === false && (
          <Text style={{ fontSize: 12, textAlign: "center", color: "#999" }}>
            Sem conexão: exibindo dados salvos.
          </Text>
        )}
        {!!error && values && (
          <Text style={{ fontSize: 12, textAlign: "center", color: "#C44747" }}>
            {error} — exibindo dados salvos.
          </Text>
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
          text="próximos dias"
          mainColor="#80A218"
          variant="secondary"
          onPress={() => navigation.navigate("ForecastWeatherScreen", { period: "nextdays" })}
        />
      </View>
    </MainStructure>
  );
}
