import React from 'react';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import queryClient from './(services)/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import AppWrapper from './(redux)/AppWrapper';
import  store  from './(redux)/store';





export default function RootLayout() {
  const colorScheme = useColorScheme();


  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


if (loaded) {
  SplashScreen.hideAsync(); 

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