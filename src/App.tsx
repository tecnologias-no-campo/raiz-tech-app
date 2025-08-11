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
import { MainText } from './components/MainText';
import { PlaylistButton } from './components/PlaylistButton';
import { VideoCard } from './components/VideoCard';
import { VideoPlay } from './components/VideoPlay';
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

        <VideoPlay videoId='6b_PLFIz6s8' aspectRatio={9/16} width={300}/>

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

        <VideoCard 
          image={require('./assets/images/pictures/teste.jpg')} 
          title='Como devo fazer o desbaste do Pinus' 
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem facere velit aspernatur laborum voluptas.'
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

        <PlaylistButton backgroundImage={require('./assets/images/pictures/teste.jpg')} text='Cultura do pinus'/>

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

        <MainText color="#636363">Caso tenha alguma dúvida ou problema com o aplicativo envie o seu número e o problema que entraremos em contato com você!</MainText>
     </ScrollView>
  );
}

