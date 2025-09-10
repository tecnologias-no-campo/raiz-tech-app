export type RootStackParamList = {
    MenuHistoryScreen: undefined;
    ProductHistoryScreen: {product: string};
    MenuWeatherScreen: undefined;
    ForecastWeatherScreen: {period:  'today' | 'tomorrow' | 'nextdays' };
    MenuVideoScreen: undefined;
    VideosVideoScreen: {idPlaylist: string};
    PlayVideoScreen: {videoId: any};
    HomeScreen: undefined;
    LoginScreen: undefined;
    SignInScreen: undefined;
    SignUpFormScreen: undefined;
    SignUpScreen: undefined;
}