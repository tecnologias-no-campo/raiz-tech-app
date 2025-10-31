// screens/ProductHistoryScreen/index.tsx
import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "./styles";
import { PrimaryHistoryCard } from "../../components/PrimaryHistoryCard";
import { FullHistoryCard } from "../../components/FullHistoryCard";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { productImageMap } from "../../utils/productImageMap";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSidraHistory } from "../../hooks/useSidraHistory";

type Props = NativeStackScreenProps<RootStackParamList, "ProductHistoryScreen">;

export function ProductHistoryScreen({ route }: Props) {
  const { product } = route.params;
  const { items, loading, error, fromCache, lastUpdated, isOnline, isStale } = useSidraHistory(product);

  const year = items.length > 0 ? items[0].D3N : "...";

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
        <MainHeader title={product} source={productImageMap[product]} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </MainStructure>
    );
  }

  if (error && items.length === 0) {
    return (
      <MainStructure>
        <MainHeader title={product} source={productImageMap[product]} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 18, color: "#D32F2F", textAlign: "center", fontWeight: "bold" }}>
            {error}
          </Text>
        </View>
      </MainStructure>
    );
  }

  return (
    <MainStructure>
      <MainHeader title={product} source={productImageMap[product]} />

      {/* Avisos/Status */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {!!lastUpdated && (
          <Text style={{ fontSize: 12, textAlign: "center", color: isStale ? "#C47F00" : "#4CAF50" }}>
            {fromCache
              ? `Mostrando dados armazenados • Última atualização: ${formatLastUpdated(lastUpdated)}`
              : `Atualizado em: ${formatLastUpdated(lastUpdated)}`}
          </Text>
        )}
        {isOnline === false && (
          <Text style={{ fontSize: 12,  textAlign: "center", color: "#999" }}>
            Sem conexão: exibindo dados salvos (se disponíveis).
          </Text>
        )}
        {!!error && items.length > 0 && (
          <Text style={{ fontSize: 12, textAlign: "center", color: "#C44747" }}>
            {error} — exibindo dados salvos.
          </Text>
        )}
        {isStale && (
          <Text style={{ fontSize: 12, textAlign: "center", color: "#C47F00" }}>
            Aviso: cache desatualizado. Conecte-se para atualizar.
          </Text>
        )}
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <FullHistoryCard year={year}>
          {items.map((item, index) => (
            <PrimaryHistoryCard
              key={index}
              vari={`${item.D2N}`}
              data={`${item.V}`}
              unit={`${item.MN}`}
            />
          ))}
        </FullHistoryCard>
      </View>
    </MainStructure>
  );
}
