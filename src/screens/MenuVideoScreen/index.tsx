// Tela de menu para acessar os vídeos. Essa tela traz cada uma das playlists que vão estar no canal do youtube
// Imports padrão
import React from "react";
import { ScrollView } from "react-native";

// Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { PlaylistButton } from "../../components/PlaylistButton";

//Mock de dados
import { PlaylistItem, PlaylistResponse } from "../../types/videosPlType";
import mock_videos from '../../data/mockYOUTUBEPL.json'

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'MenuVideoScreen'>

export function MenuVideoScreen({navigation} : Props)   {

    //Fazendo o mock de dados de playlists
    const playlists : PlaylistItem[] = (mock_videos as PlaylistResponse).items.map(item => ({
        id: item.id,
        title: item.snippet.title,
    }))

    return (
        <MainStructure>
            <MainHeader
                title="VÍDEOS"
                source={require('../../assets/images/icons/general/play-button-icon.png')}
            />

            <ScrollView style={{marginTop: 30}}>

                {playlists.map((item, index) => (
                    <PlaylistButton
                        key={index}
                        backgroundImage={require('../../assets/images/pictures/teste.jpg')}
                        text={item.title}
                        onPress={() => navigation.navigate("VideosVideoScreen", {idPlaylist: item.id})}
                    />
                ))}
               
            </ScrollView>
        </MainStructure>
    )
}