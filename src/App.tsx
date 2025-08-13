import { useFonts } from 'expo-font';
import { ProductHistoryScreen } from './screens/ProductHistoryScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
      <SafeAreaView style={{width: '100%', height: '100%', padding: 0, margin: 0}} edges={["top", "bottom"]}>
        <ProductHistoryScreen/>
      </SafeAreaView> 
  );
}

