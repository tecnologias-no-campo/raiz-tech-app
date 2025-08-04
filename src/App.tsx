import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginStructure } from './components/LoginStructure';
import { SimpleButton } from './components/SimpleButton';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
    <LoginStructure>
      <SimpleButton
        title="Sobre o App"
        variant="secondary"
        mainColor="#80A218"
      />

      <SimpleButton
        title="Entrar"
        variant="primary"
        mainColor="#008000"
      />

      <SimpleButton
        title="Sair do aplicativo"
        variant="primary"
        mainColor="#FF3131"
      />
    </LoginStructure>
    
  );
}

