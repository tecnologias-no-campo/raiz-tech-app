// hooks/useYouTubePlaylists.ts
import { useEffect, useMemo, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getChannelPlaylists, YouTubeCache, PLAYLISTS_CACHE_TTL_MS } from "../services/youtubeService";

export function useYouTubePlaylists(ttl = PLAYLISTS_CACHE_TTL_MS) {
  const [playlists, setPlaylists] = useState<Array<{ id: string; title: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => setIsOnline(!!s.isConnected));
    return () => unsub();
  }, []);

  const isStale = useMemo(() => YouTubeCache.isStale(lastUpdated, ttl), [lastUpdated, ttl]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const out = await getChannelPlaylists({ isOnline, ttl });
      if (!mounted) return;
      setPlaylists(out.playlists);
      setFromCache(!!out.fromCache);
      setLastUpdated(out.lastUpdated);
      setError(out.error);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [isOnline, ttl]);

  return { playlists, loading, error, fromCache, lastUpdated, isOnline, isStale };
}
