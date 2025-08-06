import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginStructure } from './components/LoginStructure';
import { SimpleButton } from './components/SimpleButton';
import { FormField } from './components/FormField';
import { ImageButton } from './components/ImageButton';
import { FooterNav } from './components/FooterNav';
import { ImageTextButton } from './components/ImageTextButton';
import { MainTitle } from './components/MainTitle';
import {DecorativeIcon} from './components/DecorativeIcon';
import { MainHeader } from './components/MainHeader';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
     <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fff' }}>
        <ImageTextButton
          source={require('./assets/images/icons/general/money-icon.png')} 
          text="Histórico" 
          mainColor="#80A218" 
          variant="primary" 
        />

        <ImageTextButton
          source={require('./assets/images/icons/history/tobacco-icon.png')} 
          text="Tabaco" 
          mainColor="#80A218" 
          variant="secondary" 
        />

      <MainTitle
      title="Raiz Tech"
      />

      <DecorativeIcon
        source={require('./assets/images/icons/history/tobacco-icon.png')}
        backgroundColor="#80A218"
      />

      <MainHeader
        title='Configurações'
        source={require('./assets/images/icons/general/settings-icon.png')}
      />
      </View>  
  );
}

