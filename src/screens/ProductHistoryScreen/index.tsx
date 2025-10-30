// Imports padrão
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "./styles";

// Components
import { PrimaryHistoryCard } from "../../components/PrimaryHistoryCard";
import { FullHistoryCard } from "../../components/FullHistoryCard";
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";

// API
import { sidraApi } from "../../services/sidraApi";

// Types
interface SidraItem {
  D2N: string;
  D3N: string;
  MN: string; 
  V: string;  
}

// Utils
import { productImageMap } from "../../utils/productImageMap";

// Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'ProductHistoryScreen'>


const productIdMap: { [key: string]: string } = {
  'soja': '2713',
  'milho': '2711',
  'trigo': '2716',
  'feijão': '2702',
  'fumo': '2703', // Este é o Tabaco
  'tabaco': '2703', // Adicionando como 'tabaco' também, por segurança
  'cebola': '2696',
  'batata': '2694', // Assumindo que a home vai mandar "batata"
  'batata-inglesa': '2694', // Adicionando nome completo por segurança
};

export function ProductHistoryScreen({ route }: Props) {

  const { product } = route.params;

  // --- LINHA DE DEBUG ADICIONADA AQUI ---
  console.log("===================================");
  console.log("Nome do produto recebido:", `"${product}"`); // Mostra o nome exato
  console.log("===================================");
  // ------------------------------------

  const [itens, setItens] = useState<SidraItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = productIdMap[product]; 

  useEffect(() => {
    const fetchHistory = async () => {
      if (!productId) {
        // O erro "ID do produto não encontrado." é gerado aqui
        setError("ID do produto não encontrado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); 

      try {
        const response = await sidraApi.get(
          `/t/1612/n2/4/v/all/p/last/c81/${productId}/f/u`
        );
        
        if (Array.isArray(response.data) && response.data.length > 1) {
          const [, ...results] = response.data; 

          if (results.length > 0) {
            setItens(results); 
          } else {
            setError(`A API do IBGE não retornou dados para "${product}" na Região Sul para o último ano.`);
          }
        } else {
          setError("Erro ao processar a resposta do IBGE. Resposta inesperada.");
        }

      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError("Erro ao conectar com a API do IBGE. Verifique sua conexão ou tente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [product, productId]); 

  const year = itens.length > 0 ? itens[0].D3N : "...";

  // Renderização (Loading)
  if (loading) {
    return (
      <MainStructure>
        <MainHeader title={product} source={productImageMap[product]} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </MainStructure>
    );
  }

  // Renderização (Error)
  if (error) {
    return (
      <MainStructure>
        <MainHeader title={product} source={productImageMap[product]} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, color: '#D32F2F', textAlign: 'center', fontWeight: 'bold' }}>
            {error}
          </Text>
        </View>
      </MainStructure>
    );
  }

  // Renderização (Sucesso)
  return (
    <MainStructure>
      <MainHeader title={product} source={productImageMap[product]} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FullHistoryCard year={year} >
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