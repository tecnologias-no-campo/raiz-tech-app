import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    homeScreen_background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
        width: '100%',
    },

    homeScreen_overlay:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    homeScreen_align:  {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 40
    },

    homeScreen_contentAlign:    {
        width: '100%',
        alignItems: "center",
        height: "70%",
        justifyContent: "space-around",
    }, 

    homeScreen_text:    {
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    }
});