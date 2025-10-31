// hooks/useYouTubePlaylistVideos.ts
import { useEffect, useMemo, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getPlaylistVideos, YouTubeCache, VIDEOS_CACHE_TTL_MS } from "../services/youtubeService";
import type { VideoItem } from "../types/videosVdType";

export function useYouTubePlaylistVideos(playlistId: string, pageSize = 25, ttl = VIDEOS_CACHE_TTL_MS) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
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
    if (!playlistId) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      const out = await getPlaylistVideos({ isOnline, playlistId, ttl, pageSize });
      if (!mounted) return;
      setVideos(out.videos);
      setFromCache(!!out.fromCache);
      setLastUpdated(out.lastUpdated);
      setError(out.error);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [playlistId, isOnline, ttl, pageSize]);

  return { videos, loading, error, fromCache, lastUpdated, isOnline, isStale };
}
