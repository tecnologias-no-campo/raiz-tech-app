//Componente que define o player do youtube para cada um dos vídeos

//Imports padrão
import React from "react";
import {View, Dimensions} from "react-native";
import { styles } from "./styles";

//Imports youtube
import YoutubePlayer, {YoutubeIframeProps} from 'react-native-youtube-iframe';

interface VideoPlayProps extends  Omit<YoutubeIframeProps, "width" | "height"> {
    videoId: string;   
}

export function VideoPlay({videoId, ...rest} : VideoPlayProps)  {

    //Definicão de dimensões dinâmicas
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.7;

    //Definicão do tamanho do player
    const height = Math.round(cardWidth / (9/16))

    return (
        <View style={[styles.videoPlay_container, {width: cardWidth, height: height}]}>
            <YoutubePlayer
                height={height}
                width={cardWidth}
                videoId={videoId}
                 webViewProps={{
                    injectedJavaScript: `
                        var element = document.getElementsByClassName('container')[0];
                        element.style.position = 'unset';
                        true;
                    `,
                    // Uma solução temporária mas que pode gerar problemas no aplicativo
                    //Única solução encontrada até o momento para exibir o player na vertical
                }}
                {...rest}
            />
        </View>
    )
}