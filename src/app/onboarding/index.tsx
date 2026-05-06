import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <OnboardingScreen title="Приложение для занятий спортом" subtitle="Настроим цель, уровень, оборудование и первые силовые показатели, чтобы потом собрать персональный план.">
      <View style={styles.heroMark}>
        <Text style={styles.heroText}>SM</Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Начать" onPress={() => router.push('/onboarding/gender')} />
        <PrimaryButton label="Уже есть аккаунт" variant="ghost" onPress={() => {}} />
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  heroMark: {
    flex: 1,
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroText: {
    color: '#DFF5CB',
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: -5,
  },
  footer: {
    marginTop: 'auto',
    gap: Spacing.two,
  },
});
