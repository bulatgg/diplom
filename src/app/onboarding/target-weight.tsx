import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NumberRuler } from '@/components/onboarding/number-ruler';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';
import { getWeightDeltaText } from '@/lib/body-metrics';
import { kgToLb, lbToKg } from '@/lib/units';

export default function TargetWeightScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  const isMetric = profile.weightUnit === 'metric';
  const displayedTargetWeight = isMetric ? profile.targetWeightKg : kgToLb(profile.targetWeightKg);

  function updateTargetWeight(displayValue: number) {
    const targetWeightKg = isMetric ? displayValue : lbToKg(displayValue);
    updateProfile({ targetWeightKg });
  }

  return (
    <OnboardingScreen eyebrow="Шаг 6" title="Какой вес хочешь?" subtitle="Это поможет понять направление: набор, снижение или поддержание веса.">
      <NumberRuler
        value={displayedTargetWeight}
        suffix={isMetric ? 'кг' : 'lb'}
        min={isMetric ? 35 : 77}
        max={isMetric ? 180 : 397}
        step={isMetric ? 1 : 2}
        onChange={updateTargetWeight}
      />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Что это значит</Text>
        <Text style={styles.cardText}>{getWeightDeltaText(profile.weightKg, profile.targetWeightKg)}</Text>
        <Text style={styles.hint}>Сохраняем внутри: {profile.targetWeightKg} кг</Text>
      </View>
      <PrimaryButton label="Продолжить" onPress={() => router.push('/onboarding/level')} />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cardTitle: {
    color: '#F8FFE9',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: Spacing.one,
  },
  cardText: {
    color: '#B8C7B3',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  hint: {
    marginTop: Spacing.two,
    color: '#B8C7B3',
    fontSize: 13,
    fontWeight: '700',
  },
});
