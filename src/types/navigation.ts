export type RootStackParamList = {
    MenuHistoryScreen: undefined;
    ProductHistoryScreen: {product: string};
    MenuWeatherScreen: undefined;
    ForecastWeatherScreen: {period:  'today' | 'tomorrow' | 'nextdays' };
    MenuVideoScreen: undefined;
    VideosVideoScreen: {idPlaylist: string, titlePlaylist: string};
    PlayVideoScreen: {videoId: any};
    HomeScreen: undefined;
    LoginScreen: undefined;
    SignInScreen: undefined;
    SignUpFormScreen: {userId: string};
    SignUpScreen: undefined;
    ProfileScreen: undefined;
    SettingsScreen: undefined;
    AboutScreen: undefined;
    SupportScreen: undefined;
}