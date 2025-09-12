//Imports padrão
import React from "react";
import { View, Image, Dimensions, ScrollView } from "react-native";
import {styles} from './styles'

//Components
import { StandardCard } from "../../components/StandardCard";
import { MainText } from "../../components/MainText";
import { SimpleButton } from "../../components/SimpleButton";
import { MainHeader } from "../../components/MainHeader";
import { MainStructure } from "../../components/MainStructure";

//Navigator
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SecondaryTitle } from "../../components/SecondaryTitle";


type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>

export function ProfileScreen({navigation} : Props) {

    //Definição de tela adaptável
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.9;

    return (
        <MainStructure>
            <MainHeader
                title='Perfil'
                source={require('../../assets/images/icons/general/person-icon.png')}
            />
            <View style={styles.profileScreen_container}>

                <StandardCard
                    borderColor="#008000"
                    width={cardWidth}
                    borderWidth={3}
                    height={'70%'}
                >
                <ScrollView>
                    <View style={styles.profileScreen_headerProfile}>
                        <SecondaryTitle
                            title="Nome produtor"
                            color="#008000"
                        />

                        <Image
                            style={styles.profileScreen_image}
                            source={require('../../assets/images/pictures/teste.jpg')}
                            borderRadius={50}
                        />
                    </View> 
                    
                    <View style={styles.profileScreen_contentProfile}>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Fezenda: Rencão da Amizade</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Local: Guamiranga</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Área total: 10ha</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Tipo da produção: Agricultura</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Pricipal Produto: Tabaco</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Nº de trabalhadores: 5</MainText>
                        <MainText style={styles.profileScreen_contentProfile_item} color='#636363'>Nível de tecnologia: Intermediário</MainText>
                    </View>   
                </ScrollView>                
                </StandardCard>
                <SimpleButton
                    title="Sair do app"
                    mainColor="#FF3131"
                    variant="primary"
                    onPress={() => navigation.navigate('LoginScreen')}                    
                />
            </View>
        </MainStructure>
        
    )
}

