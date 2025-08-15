import { useFonts } from 'expo-font';
import { MenuHistoryScreen } from './screens/MenuHistoryScreen';
import { ProductHistoryScreen } from './screens/ProductHistoryScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
      <SafeAreaProvider>
        <ProductHistoryScreen/>
      </SafeAreaProvider> 
  );
}

