import { Button, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    playlistButton_text: {
        fontSize: 28,
        fontFamily: 'BebasNeue-Regular',
        textAlign: 'center',
        color: '#fdfdfd',
    },

    playlistButton_button: {
        display: "flex",
        width: 300,
        height: 75,
        marginVertical: 10,
        backgroundColor: "#F0B705",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },

    playlistButton_image: {
        width: '100%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});