import React from "react";
import { PrimaryHistoryCard } from "../../components/PrimaryHistoryCard";
import { FullHistoryCard } from "../../components/FullHistoryCard";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { View, ScrollView } from "react-native";
import { styles } from "./styles";
import { SidraResponse } from "../../types/historyType";
import mockData from "../../data/mockSIDRA.json";

//Utils
import { productImageMap } from "../../utils/productImageMap";

//Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'ProductHistoryScreen'>

export function ProductHistoryScreen({navigation, route} : Props)  {
    const data : SidraResponse = mockData;
    const itens = data.ArrayOfValorDescritoPorSuasDimensoes.ValorDescritoPorSuasDimensoes;

    //Obtendo o nome do produto via navegação
    const {product} = route.params;

    return(
        <MainStructure>
            <MainHeader
                title={product}
                source={productImageMap[product]}
            />
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <FullHistoryCard
                        year="2023"
                    >
                        
                    {itens.map((item, index) => (
                        <PrimaryHistoryCard
                            key={index}
                            vari={`${item.D2N}`}
                            data={`${item.V}`}
                            unit={`${item.MN}`}
                        />
                    ))}
                        
                    </FullHistoryCard>

                </View>
                
        </MainStructure>
    )
}