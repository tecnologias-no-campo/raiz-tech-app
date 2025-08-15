import React from "react";
import { PrimaryHistoryCard } from "../../components/PrimaryHistoryCard";
import { FullHistoryCard } from "../../components/FullHistoryCard";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { View, ScrollView } from "react-native";
import { styles } from "./styles";
import { SidraResponse, ValorDescritoPorSuasDimensoes } from "../../types/historyType";
import mockData from "../../data/mockSIDRA.json";
import { FooterNav } from "../../components/FooterNav";

export function ProductHistoryScreen()  {
    const data : SidraResponse = mockData;
    const itens = data.ArrayOfValorDescritoPorSuasDimensoes.ValorDescritoPorSuasDimensoes;

    return(
        <MainStructure>
            <MainHeader
                title="TABACO"
                source={require('../../assets/images/icons/general/money-icon.png')}
            />
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <FullHistoryCard
                        year="2023"
                    >
                        
                    {itens.map((item, index) => (
                        <PrimaryHistoryCard
                            key={index}
                            vari={`${item.D2N}`}
                            data={`${item.V} ${item.MN}`}
                        />
                    ))}
                        
                    </FullHistoryCard>

                </View>
                
        </MainStructure>
    )
}