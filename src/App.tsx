// App.tsx

// Imports padrão
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar, View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { PaperProvider } from 'react-native-paper';

// Supabase (client com SecureStore)
import { supabase } from './services/supabaseClient';

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
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

// ----- Stacks separados -----
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#ffffff' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignUpFormScreen" component={SignUpFormScreen} />
      {/* Se quiser, deixe About/Support aqui também para acesso público */}
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#ffffff' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MenuHistoryScreen" component={MenuHistoryScreen} />
      <Stack.Screen name="ProductHistoryScreen" component={ProductHistoryScreen} />
      <Stack.Screen name="MenuWeatherScreen" component={MenuWeatherScreen} />
      <Stack.Screen name="ForecastWeatherScreen" component={ForecastWeatherScreen} />
      <Stack.Screen name="MenuVideoScreen" component={MenuVideoScreen} />
      <Stack.Screen name="VideosVideoScreen" component={VideosVideoScreen} />
      <Stack.Screen name="PlayVideoScreen" component={PlayVideoScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
    </Stack.Navigator>
  );
}

// ----- App com gate de autenticação -----
export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Restaura sessão ao abrir
    (async () => {
      const { data } = await supabase.auth.getSession();
      setIsLogged(!!data.session);
      setChecking(false);
    })();

    // Observa mudanças de auth (login/logout/refresh)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(!!session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!fontsLoaded || checking) {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#008000" />
            <Text style={{ marginTop: 8, color: '#333' }}>Carregando…</Text>
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <NavigationContainer theme={MyTheme}>
          {isLogged ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
