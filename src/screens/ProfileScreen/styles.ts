import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    profileScreen_container: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    profileScreen_image: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },

    profileScreen_headerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        width: '100%',
        marginVertical: 20
    },

    profileScreen_contentProfile: {
        marginBottom: 20,  
            
    }, 

    profileScreen_contentProfile_item:   {
        marginBottom: 10
    }
})