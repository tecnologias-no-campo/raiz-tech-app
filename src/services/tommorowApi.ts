// services/tomorrowApi.ts
const TOMORROW_API_KEY = process.env.EXPO_PUBLIC_TOMORROW_API_KEY;
// Você pode trocar 'location' por algo dinâmico (GPS, perfil, etc.)
export const DEFAULT_LOCATION = "-25.2419,-50.7719";

if (!TOMORROW_API_KEY) {
  console.warn("[TomorrowAPI] EXPO_PUBLIC_TOMORROW_API_KEY ausente");
}

export const tomorrowApi = {
  buildRealtimeUrl(location = DEFAULT_LOCATION) {
    return `https://api.tomorrow.io/v4/weather/realtime?location=${location}&units=metric&apikey=${TOMORROW_API_KEY}`;
  },
  buildForecastUrl(location = DEFAULT_LOCATION) {
    // 1d = diário; se quiser 1h, troque para timesteps=1h
    return `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1d&units=metric&apikey=${TOMORROW_API_KEY}`;
  },
};
