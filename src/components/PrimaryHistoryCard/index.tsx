//Componente que define o card interno de histórico de preços

//Improts padrão
import React from "react";
import { Text, Dimensions } from "react-native";
import { styles } from "./styles";

//Components
import { StandardCard } from "../StandardCard";

interface PrimaryHistoryCardProps   {
    vari: string;
    data: string;
    unit: string;
}

export function PrimaryHistoryCard({vari, data, unit} : PrimaryHistoryCardProps)    {

    //Definições de telas adaptáveis
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.8;

    //Formatação dos números para o padrão com pontuação
    const dataformat = Number(data).toLocaleString('pt-br');

    return (
        <StandardCard background="#fdfdfd"  borderColor="#80A218" width={cardWidth} borderWidth={3} style={{padding: 20, marginTop: 20}}>
            <Text style={styles.primaryHistoryCard_title}>{vari}</Text>
            <Text style={styles.primaryHistoryCard_data}>{dataformat} {unit}</Text>
        </StandardCard>
    )
}