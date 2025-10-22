//Tela que apresenta o perfil do usuário, trazendo também os seus dados de cadastro
//Imports padrão
import React, { useEffect, useState } from "react";
import { View, Image, Dimensions, ScrollView, Alert } from "react-native";
import {styles} from './styles'

//Components
import { StandardCard } from "../../components/StandardCard";
import { MainText } from "../../components/MainText";
import { SimpleButton } from "../../components/SimpleButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";
import { SecondaryTitle } from "../../components/SecondaryTitle";

//Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Supabase
import { supabase } from "../../services/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>

interface Produtor {
    id: string;
    user_id: string;
    nome_completo: string;
    nome_fazenda: string;
    cidade: string;
    area_total_ha: string;
    tipo_producao: string;
    principal_produto: string;
    numero_trabalhadores: string;
    nivel_tecnologia: string;
}

export function ProfileScreen({navigation} : Props) {
    const [produtor, setProdutor] = useState<Produtor | null>(null);

    //Definição de tela adaptável
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.9;

    useEffect(() => {
        async function loadPerfil() {
            const {data: userData, error: userError} = await supabase.auth.getUser();
            
            if(userError || !userData.user) {
                Alert.alert("Erro! Não foi possível carregar o usuário");
                return;
            }

            const userId = userData.user.id;

            const {data, error} = await supabase
                .from("produtores")
                .select("*")
                .eq("user_id", userId)
                .single();

            if(error)   {
                Alert.alert("Erro! Não foi possível carregar os dados do perfil");
            } else {
                setProdutor(data as Produtor);
            }
        }

        loadPerfil();
    }, []);

    async function handleSignOut()  {
        const {error} = await supabase.auth.signOut();

        if(error) {
            Alert.alert("Erro ao sair: ", error.message);
        } else {
            navigation.navigate("LoginScreen");
        }
    }

    return (
        <MainStructure>
            <MainHeader
                title='Perfil'
                source={require('../../assets/images/icons/general/person-icon.png')}
            />
            <View style={styles.profileScreen_container}>

                <StandardCard
                    borderColor="#80A218"
                    width={cardWidth}
                    borderWidth={3}
                    height={'70%'}
                >
                <ScrollView>
                    <View style={styles.profileScreen_headerProfile}>
                        <SecondaryTitle
                            title={produtor?.nome_completo || "Usuário"}
                            color="#F0B705"
                        />
                    </View> 
                    
                    {produtor ? (
                        <View style={styles.profileScreen_contentProfile}>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Fazenda: {produtor.nome_fazenda}</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Local:  {produtor.cidade}</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Área total: {produtor.area_total_ha}</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Tipo da produção: {produtor.tipo_producao}</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Principal Produto: {produtor.principal_produto}</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Nº de trabalhadores: {produtor.numero_trabalhadores}</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Nível de tecnologia: {produtor.nivel_tecnologia}</MainText>
                    </View>   
                    ) : (
                        <MainText color="#636363" style={{textAlign: "center", marginTop: 20}}>
                            Carregando dados do perfil...
                        </MainText>
                    )}
                    
                </ScrollView>                
                </StandardCard>
                <SimpleButton
                    title="Sair do app"
                    mainColor="#FF3131"
                    variant="primary"
                    onPress={handleSignOut}                    
                />
            </View>
        </MainStructure>
        
    )
}

