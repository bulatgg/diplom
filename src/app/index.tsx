import { Redirect, type Href } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useOnboarding } from '@/context/onboarding-context';

export default function LaunchGate() {
  const { isLoading, profile } = useOnboarding();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#17211A" size="large" />
      </View>
    );
  }

  const nextRoute = (profile.onboardingCompleted ? '/home' : '/onboarding') as Href;

  return <Redirect href={nextRoute} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F4EC',
  },
});
