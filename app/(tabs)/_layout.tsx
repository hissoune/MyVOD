import { Tabs } from 'expo-router';
import React from 'react';
import { Alert, Button, Image, Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../(redux)/store';
import { hide } from 'expo-splash-screen';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

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
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
       <Tabs.Screen
        name="Profile"
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => <Image
          src={user ? 'https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg' : 'https://i.pinimg.com/736x/42/ee/46/42ee4666b21e3e1204ad55456d5f1dd7.jpg'}
          style={styles.userImage}
        />,
        }}
      />
      <Tabs.Screen
        name="Movies"
        options={{
          title: 'Movies',
          headerShown:true,
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
  userImage:{
    width: 28,
    height: 28,
    borderRadius: 14,
  }
});