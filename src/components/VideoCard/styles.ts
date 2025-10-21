import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    videoCard_image: {
        width: "100%",
        height:150,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    videoCard_content: {
        width: "100%",
        padding: 15,
    },

    videoCard_shadow: {
        width: 300,
        borderRadius: 12,
        backgroundColor: '#FFF',
        marginBottom: 24,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        elevation: 10,
    }

});