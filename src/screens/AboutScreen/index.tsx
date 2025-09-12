//Improts padrão
import React from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { styles } from "./styles";

//Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { MainText } from "../../components/MainText";

//Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'AboutScreen'>

export function AboutScreen({navigation} : Props)   {
    return(
        <MainStructure>
            <MainHeader
                title="Sobre o App"
                source={require('../../assets/images/icons/general/settings-icon.png')}
            />

            <View style={styles.aboutScreen_container}>
                <MainText style={styles.aboutScreen_content} color='#636363'>
                    Esse é um aplicativo desenvolvido pelo projeto de extensão Tecnologias no Campo: Capacitação de Pequenos e Médios produtores Rurais. Ele tem como objetivo capacitar e facilitar a vida do produtor rural. Aprenda como usar o app:
                </MainText>

                <YoutubePlayer
                    width={300}
                    height={220}
                    play={false}
                    videoId={"WhUldAtUi8o"}
                />
            </View>
        </MainStructure>
    )
}