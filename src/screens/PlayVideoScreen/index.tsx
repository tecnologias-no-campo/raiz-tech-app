//Tala onde aparece o player do youtube para assistir os vídeos vindos da API
//Imports padrões
import React from "react";
import { View } from "react-native";

//Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { VideoPlay } from "../../components/VideoPlay";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'PlayVideoScreen'>

export function PlayVideoScreen({route} : Props)   {

    // Pegando o id do video
    const {videoId} = route.params;

    return (
        <MainStructure>
            <MainHeader
                title="VÍDEO"
                source={require('../../assets/images/icons/general/play-button-icon.png')}
            />

            <View style={{flex: 1, justifyContent: 'center'}}>       
                <VideoPlay
                 videoId={videoId}
                />
            </View>
            
        </MainStructure>
    )
}
