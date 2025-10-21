//Componente que define os cards das playlist na seção de vídeos do aplicativo

//Imports padrão
import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {styles} from "./styles";

interface PlaylistButtonProps   {
    backgroundImage?: any;
    text: string;
    onPress: any;
}

export function PlaylistButton({backgroundImage, text, onPress} : PlaylistButtonProps)  {

    return (
       
        <TouchableOpacity onPress={onPress} style={styles.playlistButton_button}>
            <Text style={styles.playlistButton_text}>{text}</Text>        
        </TouchableOpacity>
        
            
        
    )
}