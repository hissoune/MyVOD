import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from "expo-router";
import { loadUser } from './authSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
const AppWrapper = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(loadUser())
    },[dispatch])
    return (
        <Stack >
        <Stack.Screen  name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
}

const styles = StyleSheet.create({})

export default AppWrapper;
