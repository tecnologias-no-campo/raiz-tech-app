import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LoginStructure } from './components/LoginStructure';
import { SimpleButton } from './components/SimpleButton';
import { FormField } from './components/FormField';
import { ImageButton } from './components/ImageButton';
import { FooterNav } from './components/FooterNav';
import { ImageTextButton } from './components/ImageTextButton';
import { MainTitle } from './components/MainTitle';
import {DecorativeIcon} from './components/DecorativeIcon';
import { MainHeader } from './components/MainHeader';
import { StandardCard } from './components/StandardCard';
import { PrimaryWeatherCard } from './components/PrimaryWeatherCard';
import { SecondaryWeatherCard } from './components/SecondaryWeatherCard';
import { SecondaryTitle} from './components/SecondaryTitle';
import { FullWeatherCard } from './components/FullWeatherCard';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
     <ScrollView contentContainerStyle={[{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}]}>
        <FullWeatherCard
          max='30ºC'
          min='19ºC'
          conditionIcon={require('./assets/images/icons/weather/sun-condition-icon.png')}
          evapotranspiration='0.03MM'
          probabilityRain='0%'
          wind='NO 20KM/H'
          humidity='67% - 90%'
          cloud='92%'
        />

        <FullWeatherCard
          max='30ºC'
          min='19ºC'
          conditionIcon={require('./assets/images/icons/weather/sun-condition-icon.png')}
          evapotranspiration='0.03MM'
          probabilityRain='0%'
          wind='NO 20KM/H'
          humidity='67% - 90%'
          cloud='92%'
        />

        <FullWeatherCard
          max='30ºC'
          min='19ºC'
          conditionIcon={require('./assets/images/icons/weather/sun-condition-icon.png')}
          evapotranspiration='0.03MM'
          probabilityRain='0%'
          wind='NO 20KM/H'
          humidity='67% - 90%'
          cloud='92%'
        />

        <FullWeatherCard
          max='30ºC'
          min='19ºC'
          conditionIcon={require('./assets/images/icons/weather/sun-condition-icon.png')}
          evapotranspiration='0.03MM'
          probabilityRain='0%'
          wind='NO 20KM/H'
          humidity='67% - 90%'
          cloud='92%'
        />

        <FullWeatherCard
          max='30ºC'
          min='19ºC'
          conditionIcon={require('./assets/images/icons/weather/sun-condition-icon.png')}
          evapotranspiration='0.03MM'
          probabilityRain='0%'
          wind='NO 20KM/H'
          humidity='67% - 90%'
          cloud='92%'
        />
     </ScrollView>
  );
}

