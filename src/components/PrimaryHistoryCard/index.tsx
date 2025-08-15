import React from "react";
import { Text, Dimensions } from "react-native";
import { StandardCard } from "../StandardCard";
import { styles } from "./styles";

interface PrimaryHistoryCardProps   {
    vari: string,
    data: string,
}

export function PrimaryHistoryCard({vari, data, ...rest} : PrimaryHistoryCardProps)    {

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.8;

    return (
        <StandardCard background="#fdfdfd"  borderColor="#80A218" width={cardWidth} borderWidth={3}style={{padding: 20, marginTop: 20}}>
            <Text style={styles.title}>{vari}</Text>
            <Text style={styles.data}>{data}</Text>
        </StandardCard>
    )
}