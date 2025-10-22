// Componente que define a estrutura padrão das telas de login, signIn e signUp

//Imports padrão
import React, { ReactNode } from 'react';
import {View, ViewProps, Image} from 'react-native';
import {styles} from './styles';

interface LoginStructureProps extends ViewProps {
    children: ReactNode;
}

export function LoginStructure({children, style, ...rest}: LoginStructureProps) {
    return (
        <View style={[styles.loginStructure_container, style]} {...rest}>
            <Image style={styles.loginStructure_images} source={require('../../assets/images/logos/logo-app.png')}/>
            <View  style={styles.loginStructure_content}>
                {children}
            </View>
            {/* <Image style={styles.loginStructure_images} source={require('../../assets/images/logos/logo-project.png')}/> */}
        </View>
    )
}