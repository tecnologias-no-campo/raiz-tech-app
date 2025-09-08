import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    fullWeatherCard_mainSection: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 400,
        justifyContent: 'space-between'
    },

    fullWeatherCard_evapoIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },

    fullWeatherCard_evapoText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#222222',
    },

    fullWeatherCard_evapoData: {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 30,
        color: '#222222',
    },

    fullWeatherCard_secondarySection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '95%',
        height: 190
    },

    fullWeatherCard_secondarySectionAlign: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});