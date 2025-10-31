// App.tsx

import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar, View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import { RootStackParamList } from './types/navigation';
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

// Tema
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

// Tipagem dos stacks
const Auth = createNativeStackNavigator<RootStackParamList>();
const App = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Auth.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#ffffff' },
        animation: 'fade',
      }}
    >
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="SignInScreen" component={SignInScreen} />
      <Auth.Screen name="SignUpScreen" component={SignUpScreen} />
      {/* Disponível também no stack público para completar cadastro após criar conta */}
      <Auth.Screen name="SignUpFormScreen" component={SignUpFormScreen} />
      {/* Telas opcionais públicas */}
      <Auth.Screen name="AboutScreen" component={AboutScreen} />
      <Auth.Screen name="SupportScreen" component={SupportScreen} />
    </Auth.Navigator>
  );
}

function AppStack() {
  return (
    <App.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#ffffff' },
        animation: 'fade',
      }}
    >
      <App.Screen name="HomeScreen" component={HomeScreen} />
      <App.Screen name="MenuHistoryScreen" component={MenuHistoryScreen} />
      <App.Screen name="ProductHistoryScreen" component={ProductHistoryScreen} />
      <App.Screen name="MenuWeatherScreen" component={MenuWeatherScreen} />
      <App.Screen name="ForecastWeatherScreen" component={ForecastWeatherScreen} />
      <App.Screen name="MenuVideoScreen" component={MenuVideoScreen} />
      <App.Screen name="VideosVideoScreen" component={VideosVideoScreen} />
      <App.Screen name="PlayVideoScreen" component={PlayVideoScreen} />
      <App.Screen name="ProfileScreen" component={ProfileScreen} />
      <App.Screen name="SettingsScreen" component={SettingsScreen} />
      <App.Screen name="AboutScreen" component={AboutScreen} />
      <App.Screen name="SupportScreen" component={SupportScreen} />
      {/* Também disponível no stack logado para editar cadastro depois */}
      <App.Screen name="SignUpFormScreen" component={SignUpFormScreen} />
    </App.Navigator>
  );
}

export default function AppRoot() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setIsLogged(!!data.session);
      setChecking(false);
    })();

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
