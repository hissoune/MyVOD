import { Tabs } from 'expo-router';
import React from 'react';
import { Alert, Button, Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ProtectedRoutes from '@/components/ProtectedRoutes';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ProtectedRoutes>
      
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="local-movies" color={color} />,
        }}
      />

      
    </Tabs>
    </ProtectedRoutes>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'flex-end',
    color:"#fff"
  },
});