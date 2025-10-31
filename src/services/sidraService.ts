// services/sidraService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sidraApi } from "./sidraApi";

export interface SidraItem {
  D2N: string; // variável
  D3N: string; // ano
  MN: string;  // unidade
  V: string;   // valor
}
export type CachedPayload<T> = { savedAt: number; data: T };

export const SIDRA_CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 dias

export const productIdMap: Record<string, string> = {
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

export function buildEndpoint(productId: string) {
  // t/1612 = tabela; n2/4 = Região Sul; v/all = todas variáveis; p/last = último período; c81/<produto>; f/u = formato “unlisted”
  return `/t/1612/n2/4/v/all/p/last/c81/${productId}/f/u`;
}

export function buildCacheKey(endpoint: string) {
  return `sidra:${endpoint}`;
}

export async function readSidraCache(cacheKey: string) {
  const raw = await AsyncStorage.getItem(cacheKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CachedPayload<SidraItem[]>;
  } catch {
    return null;
  }
}

export async function writeSidraCache(cacheKey: string, data: SidraItem[]) {
  const payload: CachedPayload<SidraItem[]> = { savedAt: Date.now(), data };
  await AsyncStorage.setItem(cacheKey, JSON.stringify(payload));
  return payload;
}

export async function fetchSidra(endpoint: string) {
  const res = await sidraApi.get(endpoint);
  if (!Array.isArray(res.data) || res.data.length <= 1) {
    throw new Error("Resposta inesperada do IBGE.");
  }
  const [, ...results] = res.data as SidraItem[];
  return results;
}

export function isStale(savedAt?: number | null, ttl = SIDRA_CACHE_TTL_MS) {
  if (!savedAt) return true;
  return Date.now() - savedAt > ttl;
}

/**
 * Estratégia:
 * - Se online: busca API; se ok => grava cache; fallback para cache se falhar.
 * - Se offline: tenta cache; se não houver => erro.
 */
export async function getProductHistory({
  product,
  isOnline,
  ttl = SIDRA_CACHE_TTL_MS,
}: {
  product: string;
  isOnline: boolean | null | undefined;
  ttl?: number;
}) {
  const productId = productIdMap[product];
  if (!productId) {
    // tenta um cache antigo (chave “inválida” não faz sentido; devolve erro direto)
    return { items: [] as SidraItem[], fromCache: false, lastUpdated: null as number | null, error: "ID do produto não encontrado." };
  }

  const endpoint = buildEndpoint(productId);
  const cacheKey = buildCacheKey(endpoint);

  // Se online, tenta API primeiro
  if (isOnline) {
    try {
      const items = await fetchSidra(endpoint);
      const payload = await writeSidraCache(cacheKey, items);
      return { items, fromCache: false, lastUpdated: payload.savedAt, error: null as string | null };
    } catch (err: any) {
      // Falhou online → tenta cache
      const cached = await readSidraCache(cacheKey);
      if (cached?.data?.length) {
        return { items: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: err?.message ?? "Falha ao buscar dados online." };
      }
      return { items: [], fromCache: false, lastUpdated: null, error: err?.message ?? "Falha ao buscar dados online." };
    }
  }

  // Offline → só cache
  const cached = await readSidraCache(cacheKey);
  if (cached?.data?.length) {
    return { items: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: null as string | null };
  }
  return { items: [], fromCache: false, lastUpdated: null, error: "Sem conexão e sem dados salvos para exibir." };
}
