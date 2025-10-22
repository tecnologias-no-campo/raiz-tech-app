import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    formField_input: {
        width: 270,
        height: 60,
        borderWidth: 3,
        borderRadius: 10,
        fontSize: 20,
        marginVertical: 10,
        color: '#888888',
    },

    formField_label:    {
        fontSize: 18,
        fontWeight: "600",
    },

    formField_error:    {
        fontSize: 12,
        color: "red",
        marginTop: 4,
    }
});