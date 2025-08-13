import React from "react";
import { Text } from "react-native";
import { StandardCard } from "../StandardCard";
import { styles } from "./styles";

interface PrimaryHistoryCardProps   {
    title: string,
    data: string,
}

export function PrimaryHistoryCard({title, data, ...rest} : PrimaryHistoryCardProps)    {
    return (
        <StandardCard background="#fdfdfd"  borderColor="#80A218" width='90%' borderWidth={3}style={{padding: 20, marginTop: 20}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.data}>{data}</Text>
        </StandardCard>
    )
}