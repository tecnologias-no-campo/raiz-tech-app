import React from "react";
import { Text } from "react-native";
import { StandardCard } from "../StandardCard";
import { PrimaryHistoryCard } from "../PrimaryHistoryCard";
import { SecondaryTitle } from "../SecondaryTitle";
import { styles } from "./styles";

interface FullHistoryCardProps {
    year: string,
    plantedAres: string,
    harvestedArea: string,
    quantityProduced: string,
}

export function FullHistoryCard({year, plantedAres, harvestedArea, quantityProduced, ...rest}: FullHistoryCardProps)    {
    return(
        <StandardCard  borderColor="#008000" width='90%' borderWidth={3} style={{paddingVertical: 20}}>
            <SecondaryTitle
                title={year}
                color="#008000"
            />

            <PrimaryHistoryCard
                title="Área plantada - percentual do total geral"
                data={plantedAres}
            />

            <PrimaryHistoryCard
                title="Área colhida"
                data={harvestedArea}
            />

            <PrimaryHistoryCard
                title="Quantidade produzida"
                data={quantityProduced}
            />
        </StandardCard>
    )
}

