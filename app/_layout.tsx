import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import queryClient from './(services)/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import AppWrapper from './(redux)/AppWrapper';
import { Provider } from 'react-redux';
import  store  from './(redux)/store';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

const [isAuth,setIsAuth] = useState(true)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppWrapper />
      <StatusBar style="auto" />
    </ThemeProvider>
    </QueryClientProvider>
    </Provider>
   
  );
}