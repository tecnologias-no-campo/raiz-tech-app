// Tela que apresenta os vídeos que existem em cada uma das playlists
// Importações padrão
import React from "react";
import { ScrollView } from "react-native";

// Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { VideoCard } from "../../components/VideoCard";

//Mock de dados
import { VideoItem, PlaylistVideosResponse } from "../../types/videosVdType";
import mock_videos from '../../data/mockYOUTUBEVD.json'

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'VideosVideoScreen'>

export function VideosVideoScreen({navigation, route} : Props) {

    //Pega a tag da playlist para trazer a playlist correta (Vai ser usado quando for integrado a API)
    // const {idPlaylist} = route.params;

    //Mock de dados
    const videosPlaylist : VideoItem[] = (mock_videos as PlaylistVideosResponse).items.map(item => ({
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        videoId: item.snippet.resourceId.videoId
    }))

    return (
        <MainStructure>
            <MainHeader
                title="VÍDEOS"
                source={require('../../assets/images/icons/general/play-button-icon.png')}
            />

            <ScrollView style={{marginTop: 20}}>
                {videosPlaylist.map((item, index)   => (
                    <VideoCard
                        key={index}
                        image={item.thumbnailUrl}
                        title={item.title}
                        text={item.description}
                        onPress={() => navigation.navigate("PlayVideoScreen", {videoId: item.videoId})}
                    />
                ))}
            </ScrollView>
        </MainStructure>
    )
}