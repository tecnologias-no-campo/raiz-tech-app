import React from "react";
import { Text, ViewProps, Dimensions, ScrollView } from "react-native";
import { StandardCard } from "../StandardCard";
import { PrimaryHistoryCard } from "../PrimaryHistoryCard";
import { SecondaryTitle } from "../SecondaryTitle";
import { styles } from "./styles";

interface FullHistoryCardProps extends ViewProps {
    year: string,
    // plantedAres: string,
    // harvestedArea: string,
    // quantityProduced: string,
}

export function FullHistoryCard({year, children, ...rest}: FullHistoryCardProps)    {

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.9;

    return(
        <StandardCard  borderColor="#008000" width={cardWidth} height={450} borderWidth={3} style={{paddingVertical: 20}}>
            <SecondaryTitle
                title={year}
                color="#008000"
            />

            <ScrollView>
                {children}
            </ScrollView>

            

            {/* <PrimaryHistoryCard
                title={varPlantedAreas}
                data={valuePlantedAreas}
            />

            <PrimaryHistoryCard
                title="Área plantada - percentual do total"
                data={plantedAres}
            />

            <PrimaryHistoryCard
                title="Área colhida"
                data={harvestedArea}
            />

            <PrimaryHistoryCard
                title="Área colhida  - percentual do total"
                data={harvestedArea}
            />

            <PrimaryHistoryCard
                title="Quantidade produzida"
                data={quantityProduced}
            />

            <PrimaryHistoryCard
                title="Rendimento "
                data={quantityProduced}
            /> */}
        </StandardCard>
    )
}

