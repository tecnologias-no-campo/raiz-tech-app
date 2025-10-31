// hooks/useRealtimeWeather.ts
import { useEffect, useMemo, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getRealtimeWeather, isStale, REALTIME_CACHE_TTL_MS } from "../services/tommorowService";

export function useRealtimeWeather(location?: string, ttl = REALTIME_CACHE_TTL_MS) {
  const [values, setValues] = useState<Record<string, any> | null>(null);
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
      const out = await getRealtimeWeather({ isOnline, location, ttl });
      if (!mounted) return;
      setValues(out.values);
      setFromCache(!!out.fromCache);
      setLastUpdated(out.lastUpdated);
      setError(out.error);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [isOnline, location, ttl]);

  // função opcional de refresh manual
  async function refetch() {
    setLoading(true);
    const out = await getRealtimeWeather({ isOnline: true, location, ttl });
    setValues(out.values);
    setFromCache(!!out.fromCache);
    setLastUpdated(out.lastUpdated);
    setError(out.error);
    setLoading(false);
  }

  return { values, loading, error, fromCache, lastUpdated, isOnline, isStale: stale, refetch };
}
