//Cria o campo de formulário com o estilo padrão do aplicativo de forma reutilizável

//Imports padrão
import React from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";
import { styles } from "./styles";


interface FormFieldProps extends TextInputProps {
    label: string;
    error?: string;
    mainColor: string;
}

export function  FormField({ label, error, mainColor, ...rest }: FormFieldProps) {
    const placeholderTextColor = error ? "red" : "#888888";
    const labelColor = error ? "red" : "#888888";

    const inputStyles = [
        styles.formField_input,
        {borderColor: error ? "red" : mainColor || "#000"},
    ]

    return (
        <View style={{width: "100%", marginBottom: 20}}>
            <Text style={[styles.formField_label, {color: labelColor}]}>
                {label}
            </Text>
            <TextInput
                placeholder={label}
                placeholderTextColor={placeholderTextColor}
                style={inputStyles}
                {...rest}
            />
            {error ? <Text style={styles.formField_error}>{error}</Text> : null}
        </View>
        
    )
}

