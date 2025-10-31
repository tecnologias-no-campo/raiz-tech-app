// services/youtubeService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchChannelPlaylists, fetchPlaylistVideosWithDescription, CHANNEL_ID } from "./youtubeClient";
import type { PlaylistItem } from "../types/videosPlType";
import type { VideoItem } from "../types/videosVdType";

export type CachedPayload<T> = { savedAt: number; data: T };

export const PLAYLISTS_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
export const VIDEOS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;    // 24h

function buildPlaylistsKey(channelId = CHANNEL_ID) {
  return `yt:playlists:${channelId}`;
}
function buildVideosKey(playlistId: string, pageSize = 25) {
  return `yt:playlistItems:${playlistId}:pageSize=${pageSize}`;
}

function isStale(savedAt?: number | null, ttl?: number) {
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

/** Playlists do canal (com cache/offline) */
export async function getChannelPlaylists({
  isOnline,
  ttl = PLAYLISTS_CACHE_TTL_MS,
  channelId = CHANNEL_ID,
  maxResults = 25,
}: {
  isOnline: boolean | null | undefined;
  ttl?: number;
  channelId?: string;
  maxResults?: number;
}) {
  const key = buildPlaylistsKey(channelId);

  if (isOnline) {
    try {
      const data = await fetchChannelPlaylists(maxResults);
      const payload = await writeCache<PlaylistItem[]>(key, data);
      return { playlists: data, fromCache: false, lastUpdated: payload.savedAt, error: null as string | null };
    } catch (err: any) {
      const cached = await readCache<PlaylistItem[]>(key);
      if (cached?.data?.length) {
        return { playlists: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: err?.message ?? "Falha ao carregar playlists." };
      }
      return { playlists: [] as PlaylistItem[], fromCache: false, lastUpdated: null, error: err?.message ?? "Falha ao carregar playlists." };
    }
  }

  // offline
  const cached = await readCache<PlaylistItem[]>(key);
  if (cached?.data?.length) {
    return { playlists: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: null as string | null };
  }
  return { playlists: [] as PlaylistItem[], fromCache: false, lastUpdated: null, error: "Sem conexão e sem playlists salvas para exibir." };
}

/** Vídeos de uma playlist (com cache/offline) */
export async function getPlaylistVideos({
  isOnline,
  playlistId,
  ttl = VIDEOS_CACHE_TTL_MS,
  pageSize = 25,
}: {
  isOnline: boolean | null | undefined;
  playlistId: string;
  ttl?: number;
  pageSize?: number;
}) {
  const key = buildVideosKey(playlistId, pageSize);

  if (isOnline) {
    try {
      const data = await fetchPlaylistVideosWithDescription(playlistId, pageSize);
      const payload = await writeCache<VideoItem[]>(key, data);
      return { videos: data, fromCache: false, lastUpdated: payload.savedAt, error: null as string | null };
    } catch (err: any) {
      const cached = await readCache<VideoItem[]>(key);
      if (cached?.data?.length) {
        return { videos: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: err?.message ?? "Falha ao carregar vídeos." };
      }
      return { videos: [] as VideoItem[], fromCache: false, lastUpdated: null, error: err?.message ?? "Falha ao carregar vídeos." };
    }
  }

  // offline
  const cached = await readCache<VideoItem[]>(key);
  if (cached?.data?.length) {
    return { videos: cached.data, fromCache: true, lastUpdated: cached.savedAt, error: null as string | null };
  }
  return { videos: [] as VideoItem[], fromCache: false, lastUpdated: null, error: "Sem conexão e sem vídeos salvos para exibir." };
}

export const YouTubeCache = { buildPlaylistsKey, buildVideosKey, isStale };
