import { Tabs } from 'expo-router';
import React from 'react';
import { Image, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

const homeIcon = require('@/assets/images/tabIcons/home.png');
const exploreIcon = require('@/assets/images/tabIcons/explore.png');

const tabs = [
  { name: 'home', title: 'Главная', icon: homeIcon },
  { name: 'workouts', title: 'Планы', icon: exploreIcon },
  { name: 'exercises', title: 'Упражнения', icon: exploreIcon },
  { name: 'builder', title: 'Создать', icon: exploreIcon },
  { name: 'predict', title: 'Прогноз', icon: exploreIcon },
  { name: 'community', title: 'Обмен', icon: exploreIcon },
  { name: 'profile', title: 'Профиль', icon: homeIcon },
] as const;

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
          lineHeight: 14,
          marginTop: 0,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        tabBarStyle: {
          height: 68,
          paddingTop: 4,
          paddingBottom: 6,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E7E2D6',
        },
        tabBarItemStyle: {
          paddingVertical: 0,
        },
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Image source={tab.icon} style={{ width: 24, height: 24, tintColor: color }} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
