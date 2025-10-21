// Tela que apresenta os vídeos que existem em cada uma das playlists
// Importações padrão
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {styles} from "./styles"

// Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { VideoCard } from "../../components/VideoCard";
import { SecondaryTitle } from "../../components/SecondaryTitle";

// //Mock de dados
// import { VideoItem, PlaylistVideosResponse } from "../../types/videosVdType";
// import mock_videos from '../../data/mockYOUTUBEVD.json'

import { VideoItem } from "../../types/videosVdType";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchPlaylistVideosWithDescription } from "../../services/youtubeClient";

type Props = NativeStackScreenProps<RootStackParamList, 'VideosVideoScreen'>

export function VideosVideoScreen({navigation, route} : Props) {

    //Pega a tag da playlist para trazer a playlist correta (Vai ser usado quando for integrado a API)
    const {idPlaylist, titlePlaylist} = route.params;

    // //Mock de dados
    // const videosPlaylist : VideoItem[] = (mock_videos as PlaylistVideosResponse).items.map(item => ({
    //     title: item.snippet.title,
    //     description: item.snippet.description,
    //     thumbnailUrl: item.snippet.thumbnails.high.url,
    //     videoId: item.snippet.resourceId.videoId
    // }))

    const [videosPlaylist, setVideosPlaylist] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const apiVideos = await fetchPlaylistVideosWithDescription(idPlaylist, 25);

                const mapped: VideoItem[] = apiVideos.map(v => ({
                    title: v.title,
                    description: v.description,
                    thumbnailUrl: v.thumbnailUrl ?? "",
                    videoId: v.videoId
                }));

                setVideosPlaylist(mapped);
            } catch (e) {
                console.warn("Falha ao carregar os vídeos da playlist", e);
            } finally   {
                setLoading(false);
            }
        })();
    }, [idPlaylist]);


    return (
        <MainStructure>
            <MainHeader
                title="Vídeos"
                source={require('../../assets/images/icons/general/play-button-icon.png')}
            />

            <View style={styles.videoVideoScreen_secondaryTitle}>
                <SecondaryTitle
                    title={titlePlaylist}
                    color="#008000"
                />
            </View>

            <ScrollView
                contentContainerStyle={{
                    marginTop: 30,
                    paddingHorizontal: 16,
                    paddingBottom: 40, 
                }}
            >
                
                {videosPlaylist.map((item, index)   => (
                    <VideoCard
                        key={item.videoId || index}
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