// PlayVideoScreen.tsx
// Tela do player de vídeo do YouTube com aviso de falta de internet

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";

// Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { VideoPlay } from "../../components/VideoPlay";

// Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "PlayVideoScreen">;

export function PlayVideoScreen({ route }: Props) {
  const { videoId } = route.params;
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <MainStructure>
      <MainHeader
        title="ASSISTIR"
        source={require("../../assets/images/icons/general/play-button-icon.png")}
      />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        {isOnline === false ? (
          <>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#D32F2F",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Sem conexão com a Internet
            </Text>
            <Text style={{ color: "#555", textAlign: "center", fontSize: 15 }}>
              Os vídeos não foram carregados devido à falta de conexão.{"\n"}
              Conecte-se à Internet e tente novamente.
            </Text>
          </>
        ) : (
          <VideoPlay videoId={videoId} />
        )}
      </View>
    </MainStructure>
  );
}
