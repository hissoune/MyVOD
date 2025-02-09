import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "../context/authProvider";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { issubscriped, loadUser } from '@/app/(redux)/authSlice';
const AppWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser())
     dispatch(issubscriped())
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default AppWrapper;
