import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        width: '80%',
        height: '80%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        width: '100%',
        height: '60%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    images: {
        height: '20%',   
        resizeMode: 'contain',    
    }

});