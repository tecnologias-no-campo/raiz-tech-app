export default {
  expo: {
    name: "raiz-tech",
    slug: "raiz-tech",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/adaptive-icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.guilherme_daneliv.raiztech",
      softwareKeyboardLayoutMode: "pan"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-font"
    ],
    extra: {
      eas: {
        projectId: "9284345e-211d-4d0c-9427-68c1116df90d"
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

      //Youtube keys
      youtubeApiKey: process.env.EXPO_PUBLIC_YOUTUBE_API_KEY,
      youtubeChannelId: process.env.EXPO_PUBLIC_YOUTUBE_CHANNEL_ID,
    }
  }
}
