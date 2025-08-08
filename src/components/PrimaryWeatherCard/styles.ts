import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    icon:    {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },

    infoView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, 

    textStrong: {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 28,
        color: '#222222',
    },

    textStandard:    {
        fontSize: 28,
        fontFamily: 'Roboto-Regular',
        color: '#222222',
    }


});