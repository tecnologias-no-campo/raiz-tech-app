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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    }
});