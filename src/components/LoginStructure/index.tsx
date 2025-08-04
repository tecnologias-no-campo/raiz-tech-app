import React from 'react';
import {View, ViewProps, Image} from 'react-native';
import {styles} from './styles';

export function LoginStructure({children, style, ...rest}: ViewProps) {
    return (
        <View style={[styles.container, style]}>
            <Image style={styles.images} source={require('../../assets/images/logos/logo-app.png')}/>
            <View  style={styles.content}>
                {children}
            </View>
            <Image style={styles.images} source={require('../../assets/images/logos/logo-project.png')}/>
        </View>
    )
}