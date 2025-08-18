import React from "react";
import { styles } from "./styles";
import { View } from "react-native";

//Components
import { ImageTextButton } from "../../components/ImageTextButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'MenuWeatherScreen'>

export function MenuWeatherScreen({navigation} : Props)  {
    return (
        <MainStructure>
            <MainHeader
                title="Clima"
                source={require('../../assets/images/icons/general/weather-icon.png')}
            />

            <View  style={{flex: 1, justifyContent: 'center'}}>
                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="agora"
                    mainColor="#80A218"
                    variant="secondary"
                    
                />
                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="hoje"
                    mainColor="#80A218"
                    variant="secondary"
                    
                />

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="amanhã"
                    mainColor="#80A218"
                    variant="secondary"
                    
                />

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="próximos dias"
                    mainColor="#80A218"
                    variant="secondary"
                    
                />
                
            </View>
        </MainStructure>
    )
}