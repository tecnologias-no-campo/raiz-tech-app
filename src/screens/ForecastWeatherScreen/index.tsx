// Componente que define a tela de previsão do tempo, mostrando ou a previsão do dia, ou a previsão de amanhã, ou a previsão dos próximos dias

//Imports padrão
import React, { useState, useEffect } from "react"; // <-- Adicionado useState e useEffect
import { ScrollView, View, Text, ActivityIndicator } from "react-native"; // <-- Adicionado View, Text, ActivityIndicator

//Components
import { MainStructure } from "../../components/MainStructure";
import { MainHeader } from "../../components/MainHeader";
import { FullWeatherCard } from "../../components/FullWeatherCard";

//REMOVER MOCK DE DADOS
// import mockForecast from "../../data/mockTOMMOROW.json";
import { ForecastWeatherData, ForecastDay } from "../../types/weatherForecastType";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// +++ INÍCIO DA LÓGICA DA API +++

// 1. Pegar a chave da API (do .env e app.config.js)
const TOMORROW_API_KEY = process.env.EXPO_PUBLIC_TOMORROW_API_KEY;

// 2. Definir a URL da API de PREVISÃO (Forecast) para Guamiranga, PR
const location = "-25.2419,-50.7719"; // Coordenadas de Guamiranga
const FORECAST_URL = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1d&units=metric&apikey=${TOMORROW_API_KEY}`;

// +++ FIM DA LÓGICA DA API +++

type Props = NativeStackScreenProps<RootStackParamList, 'ForecastWeatherScreen'>

export function ForecastWeatherScreen({route} : Props) {
    const {period} = route.params;

    // --- REMOVER LÓGICA DO MOCK ---
    // const forecastData : ForecastWeatherData = mockForecast;
    // const forecast : ForecastDay[] = forecastData.timelines.daily;

    // +++ INÍCIO DA NOVA LÓGICA DE ESTADO +++

    // 3. Criar estados para guardar os dados, o carregamento e os erros
    const [forecast, setForecast] = useState<ForecastDay[]>([]); // Começa com um array vazio
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 4. Criar a função para buscar os dados da API
    useEffect(() => {
        const fetchForecastData = async () => {
            
            // Verificar se a chave foi carregada corretamente
            if (!TOMORROW_API_KEY) {
                setError("Chave da API Tomorrow.io não encontrada.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(FORECAST_URL);
                if (!response.ok) {
                    const errorBody = await response.json();
                    throw new Error(`Erro na API: ${errorBody.message || response.statusText}`);
                }
                const json = await response.json();
                
                // A API do Tomorrow.io retorna os dados em `timelines.daily`
                setForecast(json.timelines.daily || []); 
                setError(null);

            } catch (e: any) {
                console.error(e);
                setError("Falha ao buscar dados do clima. Verifique sua conexão.");
            } finally {
                setIsLoading(false); // Parar de carregar, com ou sem erro
            }
        };

        fetchForecastData(); // Chamar a função
    }, []); // O [] vazio faz com que isso rode apenas uma vez, quando a tela abre

    // +++ FIM DA NOVA LÓGICA DE ESTADO +++


    // --- ATUALIZAR DATAS DINAMICAMENTE ---
    
    // Pega a data de HOJE no formato (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    
    // Pega a data de AMANHÃ no formato (YYYY-MM-DD)
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];

    // (A lógica de filtro abaixo continua a mesma, mas agora usa as datas dinâmicas)
    // --- FIM DA ATUALIZAÇÃO DE DATAS ---


    let dataToDisplay : ForecastDay[] = [];

    // Filtra os dados para mostrar hoje, amanhã ou próximos dias
    if(period === 'today')  {
        dataToDisplay = forecast.filter(day => day.time.startsWith(today));
    } else if(period === 'tomorrow')    {
        dataToDisplay = forecast.filter(day => day.time.startsWith(tomorrow));
    } else {
        dataToDisplay = forecast;
    }
    
    // 5. O que mostrar na tela durante o carregamento
    if (isLoading) {
        return (
            <MainStructure>
                <MainHeader
                    title="Carregando Previsão..."
                    source={require("../../assets/images/icons/general/weather-icon.png")}
                />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#008000" />
                </View>
            </MainStructure>
        );
    }

    // 6. O que mostrar na tela se der erro
    if (error) {
            return (
            <MainStructure>
                <MainHeader
                    title="Erro no Clima"
                    source={require("../../assets/images/icons/general/weather-icon.png")}
                />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text style={{color: 'red', marginBottom: 15, textAlign: 'center', fontWeight: 'bold'}}>{error}</Text>
                </View>
            </MainStructure>
        );
    }
    
    // 7. Se tudo deu certo, mostrar o conteúdo normal
    return (
        <MainStructure>
            <MainHeader
                title={
                    period === 'today'
                    ? "Hoje"
                    : period === 'tomorrow'
                    ? "Amanhã"
                    : "Próximos dias"
                }

                source={require("../../assets/images/icons/general/weather-icon.png")}
            />

            <ScrollView>
                {/* Se não houver dados, mostre uma mensagem */}
                {dataToDisplay.length === 0 && !isLoading &&
                    <View style={{padding: 20, alignItems: 'center'}}>
                         <Text style={{color: '#555', fontSize: 16, textAlign: 'center'}}>
                            Não há dados de previsão para exibir para o período selecionado.
                         </Text>
                    </View>
                }
                
                {dataToDisplay.map((day, index) => {
                    // O código do desenvolvedor para formatar a data já era bom,
                    // mas precisa de um ajuste para fusos horários (adicionando 'T00:00:00')
                    // para garantir que a data não mude para o dia anterior.
                    const dateObj = new Date(day.time.split('T')[0] + 'T00:00:00'); 
                    
                    const formatteDate = dateObj.toLocaleDateString('pt-br', {day: '2-digit', month: '2-digit', year: 'numeric'});
                    const weekday = dateObj.toLocaleDateString('pt-br', {weekday: 'long'})

                    const dateWithWeekday = `${weekday[0].toUpperCase() + weekday.slice(1)} - ${formatteDate}`

                    return (
                        <FullWeatherCard
                            key={index}
                            date={dateWithWeekday} // Agora mostrará a data correta
                            max={day.values.temperatureMax}
                            min={day.values.temperatureMin}
                            weatherCode={day.values.weatherCodeMax}
                            evapotranspiration={day.values.evapotranspirationAvg}
                            probabilityRain={day.values.precipitationProbabilityAvg}
                            wind={day.values.windSpeedAvg}
                            humidity={day.values.humidityAvg}
                            cloud={day.values.cloudCoverAvg}
                            visibility={day.values.visibilityAvg}
                        />
                    )
                })}
            </ScrollView>
        </MainStructure>
    )
}