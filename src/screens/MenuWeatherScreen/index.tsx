//Tela de menu para acessar a previsão do tempo, além de mostrar a previsão em tempo real
//Imports padrão
import React, { useState, useEffect } from "react"; // <-- Adicionado useState e useEffect
import { styles } from "./styles";
import { View, Dimensions, ScrollView, Text, ActivityIndicator } from "react-native"; // <-- Adicionado Text e ActivityIndicator

//NÃO PRECISAMOS MAIS DO MOCK
// import mockWeatherRealTime from '../../data/mockTOMORROWrt.json' 
import { WeatherRealtime } from "../../types/weatherRtType";

//Components
import { ImageTextButton } from "../../components/ImageTextButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";
import { StandardCard } from "../../components/StandardCard";
import { SecondaryWeatherCard } from "../../components/SecondaryWeatherCard";
import { SecondaryTitle } from "../../components/SecondaryTitle";

//Navigation
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// +++ INÍCIO DA LÓGICA DA API +++

// 1. Pegar a chave da API que configuramos
const TOMORROW_API_KEY = process.env.EXPO_PUBLIC_TOMORROW_API_KEY;

// 2. Definir a URL da API (usando Guamiranga, PR)
const location = "-25.2419,-50.7719"; // Coordenadas de Guamiranga
const WEATHER_URL = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${TOMORROW_API_KEY}&units=metric`;

// +++ FIM DA LÓGICA DA API +++

type Props = NativeStackScreenProps<RootStackParamList, 'MenuWeatherScreen'>

export function MenuWeatherScreen({navigation} : Props)  {

    //Define dimensões responsivas nas telas
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.9;

    // --- REMOVER LÓGICA DO MOCK ---
    // const realtime : WeatherRealtime = mockWeatherRealTime;
    // const values = realtime.data.values;
    
    // +++ INÍCIO DA NOVA LÓGICA DE ESTADO +++

    // 3. Criar estados para guardar os dados, o carregamento e os erros
    const [values, setValues] = useState<WeatherRealtime['data']['values'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 4. Criar a função para buscar os dados da API
    useEffect(() => {
        const fetchWeatherData = async () => {
            
            // Verificar se a chave foi carregada corretamente
            if (!TOMORROW_API_KEY) {
                setError("Chave da API Tomorrow.io não encontrada. Verifique seu .env e app.config.js");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(WEATHER_URL);
                if (!response.ok) {
                    const errorBody = await response.json();
                    throw new Error(`Erro na API: ${errorBody.message || response.statusText}`);
                }
                const json = await response.json();
                
                // A API do Tomorrow.io retorna os dados em `data.values`
                setValues(json.data.values); 
                setError(null);

            } catch (e: any) {
                console.error(e);
                setError("Falha ao buscar dados do clima. Verifique sua conexão.");
            } finally {
                setIsLoading(false); // Parar de carregar, com ou sem erro
            }
        };

        fetchWeatherData(); // Chamar a função
    }, []); // O [] vazio faz com que isso rode apenas uma vez, quando a tela abre

    // +++ FIM DA NOVA LÓGICA DE ESTADO +++

    // 5. O que mostrar na tela durante o carregamento
    if (isLoading) {
        return (
            <MainStructure>
                <MainHeader
                    title="Clima"
                    source={require('../../assets/images/icons/general/weather-icon.png')}
                />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#008000" />
                    <Text style={{marginTop: 10, color: '#333'}}>Carregando dados do clima...</Text>
                </View>
            </MainStructure>
        );
    }

    // 6. O que mostrar na tela se der erro
    if (error || !values) {
            return (
            <MainStructure>
                <MainHeader
                    title="Clima"
                    source={require('../../assets/images/icons/general/weather-icon.png')}
                />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text style={{color: 'red', marginBottom: 15, textAlign: 'center', fontWeight: 'bold'}}>{error}</Text>
                    <Text style={{textAlign: 'center', color: '#555'}}>Verifique sua conexão ou se a chave da API no .env está correta e reinicie o app (npm start -- --clear).</Text>
                </View>
            </MainStructure>
        );
    }
    
    // 7. Se tudo deu certo (isLoading = false e error = null), mostrar o conteúdo normal:
    return (
        <MainStructure>
            <MainHeader
                title="Clima"
                source={require('../../assets/images/icons/general/weather-icon.png')}
            />

            <View  style={{flex: 1, justifyContent: 'center'}}>

                <StandardCard   
                    borderColor='#008000' 
                    borderWidth={3} 
                    width={cardWidth} 
                    height={250} 
                    style={[{
                        justifyContent: 'center', 
                        paddingVertical: 20, 
                        marginVertical: 20
                    }]}>
                    <SecondaryTitle
                        title='AGORA'
                        color="#008000"
                    />
                    <ScrollView style={{width: cardWidth}}>
                        <View style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Temperatura'
                            data={`${values.temperature.toFixed(1)}°C`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Tempertura Aparente'
                            data={`${values.temperatureApparent.toFixed(1)}°C`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View  style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/humidity-icon.png')}
                            text='Humidade Relativa'
                            data={`${values.humidity}%`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/cloud-icon.png')}
                            text='Cobertura de Nuvens'
                            data={`${values.cloudCover}%`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Probabilidade de chuva'
                            data={`${values.precipitationProbability}%`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/wind-icon.png')}
                            text='Velocidade do vento'
                            data={`${values.windSpeed} km/h`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View  style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/wind-icon.png')}
                            text='Direção do vento'
                            data={`${values.windDirection}°`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Índice UV'
                            data={`${values.uvIndex}`}
                            width='45%'
                            height={90}
                        />
                    </View>

                    <View style={styles.containerAlignSecondary}>
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Visibilidade'
                            data={`${values.visibility} km`}
                            width='45%'
                            height={90}
                        />
                        <SecondaryWeatherCard
                            icon={require('../../assets/images/icons/weather/percentage-icon.png')}
                            text='Intensidade da chuva'
                            data={`${values.rainIntensity} mm/h`}
                            width='45%'
                            height={90}
                        />
                    </View>
                    </ScrollView>             
                </StandardCard>

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="hoje"
                    mainColor="#80A218"
                    variant="secondary"
                    onPress={() => navigation.navigate('ForecastWeatherScreen', {period: 'today'})}
                    
                />

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="amanhã"
                    mainColor="#80A218"
                    variant="secondary"
                    onPress={() => navigation.navigate('ForecastWeatherScreen', {period: 'tomorrow'})}
                />

                <ImageTextButton
                    source={require('../../assets/images/icons/weather/calendar-icon.png')}
                    text="próximos dias"
                    mainColor="#80A218"
                    variant="secondary"
                    onPress={() => navigation.navigate('ForecastWeatherScreen', {period: 'nextdays'})}
                />
                
            </View>
        </MainStructure>
    )
}