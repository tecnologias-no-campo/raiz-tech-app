// Tela de menu para acessar os vídeos. Essa tela traz cada uma das playlists que vão estar no canal do youtube
// Imports padrão
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

// Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { PlaylistButton } from "../../components/PlaylistButton";

//COnexão com o youtube
import {fetchChannelPlaylists} from "../../services/youtubeClient";

// //Mock de dados
import { PlaylistItem } from "../../types/videosPlType";
// import mock_videos from '../../data/mockYOUTUBEPL.json'

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'MenuVideoScreen'>

export function MenuVideoScreen({navigation} : Props)   {

    //Fazendo o mock de dados de playlists
    // const playlists : PlaylistItem[] = (mock_videos as PlaylistResponse).items.map(item => ({
    //     id: item.id,
    //     title: item.snippet.title,
    // }))

    const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchChannelPlaylists(); // usa CHANNEL_ID por padrão
            setPlaylists(data);
        } catch (e) {
            console.warn("Falha ao carregar playlists:", e);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    return (
        <MainStructure>
            <MainHeader
                title="VÍDEOS"
                source={require('../../assets/images/icons/general/play-button-icon.png')}
            />

            <ScrollView 
                contentContainerStyle={{
                    marginTop: 30,
                    paddingTop: 30,
                    paddingHorizontal: 16,
                    paddingBottom: 40, 
                }}
            >

                {playlists.map((item, index) => (
                    <PlaylistButton
                        key={item.id}
                        // backgroundImage={require('../../assets/images/pictures/teste.jpg')}
                        text={item.title}
                        onPress={() => navigation.navigate("VideosVideoScreen", {idPlaylist: item.id, titlePlaylist: item.title})}
                    />
                ))}
               
            </ScrollView>
        </MainStructure>
    )
}