import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    primaryButton: {
        width: 270,
        height: 60,
        borderRadius: 10,
    },

    secondaryButton: {
        height: 55,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 5,
    },

    button: {
        justifyContent:  'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    text: {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 28,
        alignItems: 'center',
    },

    primaryText: {
        color: '#ffffff',
    },

    secondaryText: {
        color: '#F0B705',
    },
});