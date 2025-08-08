import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    textHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10
    },

    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }, 

    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#222222',
        width: '75%',
        textAlign: 'right'
    },

    data:   {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 30,
        color: '#222222',
    }

});