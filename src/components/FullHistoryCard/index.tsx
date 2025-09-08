//Componente que define o esqueleto padrão do card de histórico de preços de produtos

//Imports padrão
import React from "react";
import { ViewProps, Dimensions, ScrollView } from "react-native";
import { styles } from "./styles";

//Components
import { StandardCard } from "../StandardCard";
import { SecondaryTitle } from "../SecondaryTitle";


interface FullHistoryCardProps extends ViewProps {
    year: string;
}

export function FullHistoryCard({year, children}: FullHistoryCardProps)    {

    //Definição de tela adaptável
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.9;

    return(
        <StandardCard  
            borderColor="#008000" 
            width={cardWidth} 
            height={450} 
            borderWidth={3} 
            style={{paddingVertical: 20}}
        >
            <SecondaryTitle
                title={year}
                color="#008000"
            />

            <ScrollView>
                {children}
            </ScrollView>
        </StandardCard>
    )
}

