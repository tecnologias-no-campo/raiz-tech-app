// services/youtubeClient.ts
import { VideoItem } from "../types/videosVdType";
import { PlaylistItem } from "../types/videosPlType";
import Constants from "expo-constants";

const extra = (Constants.expoConfig?.extra ?? {}) as {
  youtubeApiKey?: string;
  youtubeChannelId?: string;
};

export const YT_API_KEY = extra.youtubeApiKey;
export const CHANNEL_ID = extra.youtubeChannelId;

if (!YT_API_KEY || !CHANNEL_ID) {
  throw new Error("Chaves de acesso ao Youtube ausentes!");
}

export function qs(params: Record<string, string | number | undefined>) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) usp.append(k, String(v));
  });
  return usp.toString();
}

// Playlists do canal
export async function fetchChannelPlaylists(
  maxResults = 25,
  pageToken?: string
): Promise<PlaylistItem[]> {
  const url = `https://www.googleapis.com/youtube/v3/playlists?${qs({
    part: "snippet,contentDetails",
    channelId: CHANNEL_ID,
    maxResults,
    key: YT_API_KEY,
    ...(pageToken ? { pageToken } : {}),
  })}`;

  const r = await fetch(url);
  const j = await r.json();

  if (!r.ok) {
    const msg = j?.error?.message || `YouTube API error (${r.status})`;
    throw new Error(msg);
  }

  const items = (j.items || []) as Array<{
    id: string;
    snippet: { title: string };
  }>;

  return items.map((it) => ({ id: it.id, title: it.snippet.title }));
}

// Vídeos de uma playlist (com description)
export async function fetchPlaylistVideosWithDescription(
  playlistId: string,
  maxResults = 25,
  pageToken?: string
): Promise<VideoItem[]> {
  const urlPI = `https://www.googleapis.com/youtube/v3/playlistItems?${qs({
    part: "snippet,contentDetails",
    playlistId,
    maxResults,
    key: YT_API_KEY,
    ...(pageToken ? { pageToken } : {}),
  })}`;

  const rPI = await fetch(urlPI);
  const jPI = await rPI.json();

  if (!rPI.ok) {
    const msg = jPI?.error?.message || `YouTube API error (${rPI.status})`;
    throw new Error(msg);
  }

  const itemsPI = (jPI.items || []) as Array<{ contentDetails?: { videoId?: string } }>;
  const ids = itemsPI.map((it) => it.contentDetails?.videoId).filter((id): id is string => !!id);

  if (ids.length === 0) return [];

  const urlV = `https://www.googleapis.com/youtube/v3/videos?${qs({
    part: "snippet",
    id: ids.join(","),
    key: YT_API_KEY,
  })}`;

  const rV = await fetch(urlV);
  const jV = await rV.json();

  if (!rV.ok) {
    const msg = jV?.error?.message || `YouTube API error (${rV.status})`;
    throw new Error(msg);
  }

  const itemsV = (jV.items || []) as Array<{
    id: string;
    snippet: {
      title?: string;
      description?: string;
      thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } };
    };
  }>;

  return itemsV.map((v) => ({
    title: v.snippet?.title || "",
    description: v.snippet?.description || "",
    thumbnailUrl:
      v.snippet?.thumbnails?.high?.url ||
      v.snippet?.thumbnails?.medium?.url ||
      v.snippet?.thumbnails?.default?.url ||
      "",
    videoId: v.id,
  }));
}
