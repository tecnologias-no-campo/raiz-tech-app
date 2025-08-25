import React from "react";
import YoutubePlayer, {YoutubeIframeRef, YoutubeIframeProps} from 'react-native-youtube-iframe';
import {View, Dimensions} from "react-native";
import { styles } from "./styles";

interface VideoPlayProps extends  Omit<YoutubeIframeProps, "width" | "height"> {
    videoId: string,    
}

export function VideoPlay({videoId, ...rest} : VideoPlayProps)  {

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.7;

    const height = Math.round(cardWidth / (9/16))

    return (
        <View style={[styles.container, {width: cardWidth, height: height}]}>
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
                }}
                {...rest}
            />
        </View>
    )
}