// hooks/useForecastWeather.ts
import { useEffect, useMemo, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getDailyForecast, isStale, FORECAST_CACHE_TTL_MS } from "../services/tommorowService";

export interface ForecastDay {
  time: string;
  values: Record<string, any>;
}

export function useForecastWeather(location?: string, ttl = FORECAST_CACHE_TTL_MS) {
  const [daily, setDaily] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => setIsOnline(!!s.isConnected));
    return () => unsub();
  }, []);

  const stale = useMemo(() => isStale(lastUpdated, ttl), [lastUpdated, ttl]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const out = await getDailyForecast({ isOnline, location, ttl });
      if (!mounted) return;
      setDaily(out.daily as any);
      setFromCache(!!out.fromCache);
      setLastUpdated(out.lastUpdated);
      setError(out.error);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [isOnline, location, ttl]);

  return { daily, loading, error, fromCache, lastUpdated, isOnline, isStale: stale };
}
