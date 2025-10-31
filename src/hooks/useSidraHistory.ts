// hooks/useSidraHistory.ts
import { useEffect, useMemo, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getProductHistory, isStale, SIDRA_CACHE_TTL_MS, SidraItem } from "../services/sidraService";

export function useSidraHistory(product: string, ttl = SIDRA_CACHE_TTL_MS) {
  const [items, setItems] = useState<SidraItem[]>([]);
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
      const out = await getProductHistory({ product, isOnline, ttl });
      if (!mounted) return;
      setItems(out.items);
      setFromCache(!!out.fromCache);
      setLastUpdated(out.lastUpdated);
      setError(out.error);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [product, isOnline, ttl]);

  return { items, loading, error, fromCache, lastUpdated, isOnline, isStale: stale };
}
