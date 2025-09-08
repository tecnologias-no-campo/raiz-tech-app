import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imageTextButton_primaryButton: {
        width: 270,
        height: 60,
        borderRadius: 10,
    },

    imageTextButton_secondaryButton: {
        height: 55,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 5,
    },

    imageTextButton_button: {
        justifyContent:  'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    imageTextButton_image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    imageTextButton_text: {
        fontFamily: 'BebasNeue-Regular',
        fontSize: 28,
        alignItems: 'center',
    },

    imageTextButton_primaryText: {
        color: '#ffffff',
    },

    imageTextButton_secondaryText: {
        color: '#F0B705',
    },
});