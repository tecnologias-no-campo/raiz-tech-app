import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    primaryWeatherCard_icon:    {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },

    primaryWeatherCard_infoView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    primaryWeatherCard_textView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, 

    primaryWeatherCard_textStrong: {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 28,
        color: '#222222',
    },

    primaryWeatherCard_textStandard:    {
        fontSize: 28,
        fontFamily: 'Roboto-Regular',
        color: '#222222',
    }


});