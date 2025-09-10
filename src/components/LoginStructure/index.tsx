// Componente que define a estrutura padrão das telas de login, signIn e signUp

//Imports padrão
import React from 'react';
import {View, ViewProps, Image} from 'react-native';
import {styles} from './styles';

export function LoginStructure({children, style}: ViewProps) {
    return (
        <View style={[styles.loginStructure_container, style]}>
            <Image style={styles.loginStructure_images} source={require('../../assets/images/logos/logo-app.png')}/>
            <View  style={styles.loginStructure_content}>
                {children}
            </View>
            <Image style={styles.loginStructure_images} source={require('../../assets/images/logos/logo-project.png')}/>
        </View>
    )
}