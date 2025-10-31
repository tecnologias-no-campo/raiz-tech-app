// Imports padrão
import React, { useEffect, useMemo, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { styles } from "./styles";

// Components
import { PrimaryHistoryCard } from "../../components/PrimaryHistoryCard";
import { FullHistoryCard } from "../../components/FullHistoryCard";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";

// API
import { sidraApi } from "../../services/sidraApi";

// Types
interface SidraItem {
  D2N: string; // Variável (ex.: produção, área, etc. – depende da consulta)
  D3N: string; // Ano
  MN: string;  // Unidade de medida
  V: string;   // Valor
}

type CachedPayload<T> = { savedAt: number; data: T };

// Utils
import { productImageMap } from "../../utils/productImageMap";

// Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ProductHistoryScreen">;

const productIdMap: Record<string, string> = {
  soja: "2713",
  milho: "2711",
  trigo: "2716",
  "feijão": "2702",
  fumo: "2703",
  tabaco: "2703",
  cebola: "2696",
  batata: "2694",
  "batata-inglesa": "2694",
};

// TTL do cache do SIDRA (ex.: 14 dias)
const SIDRA_CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000;

export function ProductHistoryScreen({ route }: Props) {
  const { product } = route.params;

  // --- Debug opcional ---
  console.log("===================================");
  console.log('Nome do produto recebido:', `"${product}"`);
  console.log("===================================");

  const [itens, setItens] = useState<SidraItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const productId = productIdMap[product];

  // Endpoint que você já usa
  const endpoint = useMemo(
    () => (productId ? `/t/1612/n2/4/v/all/p/last/c81/${productId}/f/u` : null),
    [productId]
  );

  // Chave única do cache para este produto/consulta
  const CACHE_KEY = useMemo(
    () => (endpoint ? `sidra:${endpoint}` : `sidra:invalid:${product}`),
    [endpoint, product]
  );

  // Observa conectividade
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    (async () => {
      if (!productId) {
        // Tenta ao menos mostrar cache de uma consulta antiga (se existir)
        const hadCache = await readFromCache();
        if (!hadCache) setError("ID do produto não encontrado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        if (isOnline) {
          // Online: busca e salva cache
          await fetchAndCache();
        } else {
          // Offline: tenta cache
          const hadCache = await readFromCache();
          if (!hadCache) {
            setError("Sem conexão e sem dados salvos para exibir.");
          }
        }
      } catch (e) {
        // Falha online: tenta cache
        const hadCache = await readFromCache();
        if (!hadCache) {
          setError("Erro ao conectar com a API do IBGE. Verifique sua conexão ou tente mais tarde.");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [productId, endpoint, isOnline]);

  async function fetchAndCache() {
    if (!endpoint) throw new Error("Endpoint inválido.");
    const response = await sidraApi.get(endpoint);

    // A API do SIDRA costuma retornar um array onde o primeiro item são metadados/cabeçalhos
    if (Array.isArray(response.data) && response.data.length > 1) {
      const [, ...results] = response.data as SidraItem[];
      if (results.length > 0) {
        setItens(results);
        setError(null);
        setFromCache(false);

        const payload: CachedPayload<SidraItem[]> = {
          savedAt: Date.now(),
          data: results,
        };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        setLastUpdated(payload.savedAt);
      } else {
        setError(`A API do IBGE não retornou dados para "${product}" na Região Sul para o último ano.`);
      }
    } else {
      throw new Error("Resposta inesperada do IBGE.");
    }
  }

  async function readFromCache(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return false;

    try {
      const payload = JSON.parse(raw) as CachedPayload<SidraItem[]>;
      setItens(payload.data || []);
      setLastUpdated(payload.savedAt || null);
      setFromCache(true);
      return (payload.data?.length ?? 0) > 0;
    } catch {
      return false;
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

  const isStale = lastUpdated ? Date.now() - lastUpdated > SIDRA_CACHE_TTL_MS : false;
  const year = itens.length > 0 ? itens[0].D3N : "...";

  // Loading
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

  // Error sem cache válido
  if (error && itens.length === 0) {
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

  // Sucesso (online ou cache)
  return (
    <MainStructure>
      <MainHeader title={product} source={productImageMap[product]} />

      {/* Avisos/Status */}
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
        {!!error && itens.length > 0 && (
          <Text style={{ fontSize: 12, color: "#C44747" }}>
            {error} — exibindo dados salvos.
          </Text>
        )}
        {isStale && (
          <Text style={{ fontSize: 12, color: "#C47F00" }}>
            Aviso: cache com mais de {Math.floor(SIDRA_CACHE_TTL_MS / (24 * 60 * 60 * 1000))} dias. Conecte-se para atualizar.
          </Text>
        )}
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <FullHistoryCard year={year}>
          {itens.map((item, index) => (
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
