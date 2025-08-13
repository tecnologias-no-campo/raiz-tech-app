import React from "react";
import YoutubePlayer, {YoutubeIframeRef, YoutubeIframeProps} from 'react-native-youtube-iframe';
import {View} from "react-native";
import { styles } from "./styles";

interface VideoPlayProps extends  Omit<YoutubeIframeProps, "width" | "height"> {
    aspectRatio: number;
    width: number;
    
}

export function VideoPlay({aspectRatio, width, ...rest} : VideoPlayProps)  {

    const height = Math.round(width / aspectRatio)

    return (
        <View style={[styles.container, {width: width, height: height}]}>
            <YoutubePlayer
                height={height}
                width={width}
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