//Cria o campo de formulário com o estilo padrão do aplicativo de forma reutilizável

//Imports padrão
import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

interface FormFieldProps extends TextInputProps {
    label: string;
    error?: string;
    mainColor: string;
}

export function  FormField({ label, error, mainColor, ...rest }: FormFieldProps) {

    const placeholder = error ? error : label;

    const placeholderTextColor = error ? "red" : "#888888";

    const inputStyles = [
        styles.formField_input,
        {borderColor: error ? "red" : mainColor || "#000"},
    ]

    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={inputStyles}
            {...rest}
        />
    )
}

