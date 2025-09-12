//Imports padrão
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { PaperProvider } from 'react-native-paper';

// Telas
import { MenuHistoryScreen } from './screens/MenuHistoryScreen';
import { ProductHistoryScreen } from './screens/ProductHistoryScreen';
import { MenuWeatherScreen } from './screens/MenuWeatherScreen';
import { ForecastWeatherScreen } from './screens/ForecastWeatherScreen';
import { MenuVideoScreen } from './screens/MenuVideoScreen';
import { VideosVideoScreen } from './screens/VideosVideoScreen';
import { PlayVideoScreen } from './screens/PlayVideoScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpFormScreen } from './screens/SignUpFormScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { SupportScreen } from './screens/SupportScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme, 
  colors:{
    ...DefaultTheme.colors,
    background: '#ffffff'
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
    <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator 
              initialRouteName='LoginScreen' 
              screenOptions={{
                headerShown: false, 
                contentStyle: {backgroundColor: 'transparent'}, 
                animation: 'fade'
              }}
            >
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
              <Stack.Screen
                name='ForecastWeatherScreen'
                component={ForecastWeatherScreen}
              />
              <Stack.Screen
                name='MenuVideoScreen'
                component={MenuVideoScreen}
              />
              <Stack.Screen
                name='VideosVideoScreen'
                component={VideosVideoScreen}
              />
              <Stack.Screen
                name='PlayVideoScreen'
                component={PlayVideoScreen}
              />
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
              />
              <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
              />
              <Stack.Screen
                name='SignInScreen'
                component={SignInScreen}
              />
              <Stack.Screen
                name='SignUpFormScreen'
                component={SignUpFormScreen}
              />
              <Stack.Screen
                name='SignUpScreen'
                component={SignUpScreen}
              />
              <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
              />
              <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
              />
              <Stack.Screen
                name='AboutScreen'
                component={AboutScreen}
              />
              <Stack.Screen
                name='SupportScreen'
                component={SupportScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider> 
    </PaperProvider>
      
  );
}

