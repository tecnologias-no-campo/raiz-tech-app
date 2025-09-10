import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    secondaryWeatherCard_textHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10
    },

    secondaryWeatherCard_icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }, 

    secondaryWeatherCard_text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#222222',
        width: '75%',
        textAlign: 'right'
    },

    secondaryWeatherCard_data:   {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 30,
        color: '#222222',
    }

});