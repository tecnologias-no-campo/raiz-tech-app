import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';

// Telas
import { MenuHistoryScreen } from './screens/MenuHistoryScreen';
import { ProductHistoryScreen } from './screens/ProductHistoryScreen';
import { MenuWeatherScreen } from './screens/MenuWeatherScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='MenuWeatherScreen' screenOptions={{headerShown: false, contentStyle: {backgroundColor: 'transparent'}, animation: 'none'}}>
            <Stack.Screen
              name='MenuHistoryScreen'
              component={MenuHistoryScreen}
            />
            <Stack.Screen
              name='ProductHistoryScreen'
              component={ProductHistoryScreen}
            />
            <Stack.Screen
              name='MenuWeatherScreen'
              component={MenuWeatherScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider> 
  );
}

