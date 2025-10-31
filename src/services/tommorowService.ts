import AsyncStorage from "@react-native-async-storage/async-storage";
import { tomorrowApi, DEFAULT_LOCATION } from "./tommorowApi";

export type CachedPayload<T> = { savedAt: number; data: T };

// Types mínimas (use as suas interfaces completas se quiser)
export interface WeatherRealtime {
  data: { values: Record<string, any> };
}

export interface ForecastWeatherData {
  timelines: { daily: Array<{ time: string; values: Record<string, any> }> };
}

// TTLs
export const REALTIME_CACHE_TTL_MS = 10 * 60 * 1000; // 10 min
export const FORECAST_CACHE_TTL_MS = 30 * 60 * 1000; // 30 min

// Helpers de cache
export function buildRealtimeCacheKey(location = DEFAULT_LOCATION) {
  return `weather:realtime:${location}:metric`;
}
export function buildForecastCacheKey(location = DEFAULT_LOCATION) {
  return `weather:forecast:${location}:1d:metric`;
}

export function isStale(savedAt?: number | null, ttl?: number) {
  if (!ttl) return false;
  if (!savedAt) return true;
  return Date.now() - savedAt > ttl;
}

async function readCache<T>(key: string): Promise<CachedPayload<T> | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CachedPayload<T>;
  } catch {
    return null;
  }
}

async function writeCache<T>(key: string, data: T): Promise<CachedPayload<T>> {
  const payload: CachedPayload<T> = { savedAt: Date.now(), data };
  await AsyncStorage.setItem(key, JSON.stringify(payload));
  return payload;
}

async function handleResponse(res: Response) {
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    const msg = retryAfter
      ? `Limite de requisições. Tente de novo em ${retryAfter}s.`
      : "Limite de requisições atingido. Tente novamente em alguns minutos.";
    throw new Error(msg);
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
  return res.json();
}

/** Realtime */
export async function getRealtimeWeather({
  isOnline,
  location = DEFAULT_LOCATION,
  ttl = REALTIME_CACHE_TTL_MS,
}: {
  isOnline: boolean | null | undefined;
  location?: string;
  ttl?: number;
}) {
  const key = buildRealtimeCacheKey(location);
  const url = tomorrowApi.buildRealtimeUrl(location);

  if (isOnline) {
    try {
      const json = (await fetch(url).then(handleResponse)) as WeatherRealtime;
      const payload = await writeCache(key, json.data.values);
      return {
        values: json.data.values,
        fromCache: false,
        lastUpdated: payload.savedAt,
        error: null as string | null,
      };
    } catch (err: any) {
      const cached = await readCache<Record<string, any>>(key);
      if (cached?.data) {
        return {
          values: cached.data,
          fromCache: true,
          lastUpdated: cached.savedAt,
          error: err?.message ?? "Falha ao buscar dados online.",
        };
      }
      return { values: null, fromCache: false, lastUpdated: null, error: err?.message ?? "Falha ao buscar dados online." };
    }
  }

  // offline
  const cached = await readCache<Record<string, any>>(key);
  if (cached?.data) {
    return { values: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: null as string | null };
  }
  return { values: null, fromCache: false, lastUpdated: null, error: "Sem conexão e sem dados salvos para exibir." };
}

/** Forecast diário */
export async function getDailyForecast({
  isOnline,
  location = DEFAULT_LOCATION,
  ttl = FORECAST_CACHE_TTL_MS,
}: {
  isOnline: boolean | null | undefined;
  location?: string;
  ttl?: number;
}) {
  const key = buildForecastCacheKey(location);
  const url = tomorrowApi.buildForecastUrl(location);

  if (isOnline) {
    try {
      const json = (await fetch(url).then(handleResponse)) as ForecastWeatherData;
      const daily = json?.timelines?.daily ?? [];
      const payload = await writeCache(key, daily);
      return { daily, fromCache: false, lastUpdated: payload.savedAt, error: null as string | null };
    } catch (err: any) {
      const cached = await readCache<Array<{ time: string; values: Record<string, any> }>>(key);
      if (cached?.data?.length) {
        return { daily: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: err?.message ?? "Falha ao buscar dados online." };
      }
      return { daily: [], fromCache: false, lastUpdated: null, error: err?.message ?? "Falha ao buscar dados online." };
    }
  }

  // offline
  const cached = await readCache<Array<{ time: string; values: Record<string, any> }>>(key);
  if (cached?.data?.length) {
    return { daily: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: null as string | null };
  }
  return { daily: [], fromCache: false, lastUpdated: null, error: "Sem conexão e sem dados salvos para exibir." };
}
