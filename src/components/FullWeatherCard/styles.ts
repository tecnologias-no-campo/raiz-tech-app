import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    mainSection: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 400,
        justifyContent: 'space-between'
    },

    evapoIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },

    evapoText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#222222',
    },

    evapoData: {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 30,
        color: '#222222',
    },

    secondarySection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '95%',
        height: 190
    },

    secondarySectionAlign: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});