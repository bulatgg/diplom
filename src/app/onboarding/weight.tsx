import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberRuler } from '@/components/onboarding/number-ruler';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';
import { calculateBmi, getBmiStatus } from '@/lib/body-metrics';
import { kgToLb, lbToKg } from '@/lib/units';
import { UnitSystem } from '@/types/onboarding';

export default function WeightScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  const isMetric = profile.weightUnit === 'metric';
  const displayedWeight = isMetric ? profile.weightKg : kgToLb(profile.weightKg);
  const bmi = calculateBmi(profile.weightKg, profile.heightCm);

  async function setUnit(weightUnit: UnitSystem) {
    await updateProfile({ weightUnit });
  }

  function updateWeight(displayValue: number) {
    const weightKg = isMetric ? displayValue : lbToKg(displayValue);
    updateProfile({ weightKg });
  }

  return (
    <OnboardingScreen eyebrow="Шаг 5" title="Укажи текущий вес" subtitle="ИМТ нужен как ориентир, а не как окончательный диагноз. Для спорта важнее динамика и самочувствие.">
      <View style={styles.segmented}>
        <Pressable onPress={() => setUnit('metric')} style={[styles.segment, isMetric && styles.segmentActive]}>
          <Text style={[styles.segmentText, isMetric && styles.segmentTextActive]}>Килограммы</Text>
        </Pressable>
        <Pressable onPress={() => setUnit('imperial')} style={[styles.segment, !isMetric && styles.segmentActive]}>
          <Text style={[styles.segmentText, !isMetric && styles.segmentTextActive]}>Фунты</Text>
        </Pressable>
      </View>
      <NumberRuler
        value={displayedWeight}
        suffix={isMetric ? 'кг' : 'lb'}
        min={isMetric ? 35 : 77}
        max={isMetric ? 180 : 397}
        step={isMetric ? 1 : 2}
        precision={isMetric ? 0 : 0}
        onChange={updateWeight}
      />
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Текущий ИМТ</Text>
        <Text style={styles.metricValue}>{bmi.toFixed(1)}</Text>
        <Text style={styles.metricText}>Оценка: {getBmiStatus(bmi)}</Text>
        <Text style={styles.metricHint}>Сохраняем внутри: {profile.weightKg} кг</Text>
      </View>
      <PrimaryButton label="Продолжить" onPress={() => router.push('/onboarding/target-weight')} />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 999,
  },
  segmentActive: {
    backgroundColor: '#F8FFE9',
  },
  segmentText: {
    color: '#B8C7B3',
    fontWeight: '900',
  },
  segmentTextActive: {
    color: '#17211A',
  },
  metricCard: {
    padding: Spacing.three,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  metricLabel: {
    color: '#B8C7B3',
    fontWeight: '900',
  },
  metricValue: {
    marginTop: Spacing.one,
    color: '#F8FFE9',
    fontSize: 42,
    fontWeight: '900',
  },
  metricText: {
    color: '#DFF5CB',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  metricHint: {
    marginTop: Spacing.one,
    color: '#B8C7B3',
    fontSize: 13,
    fontWeight: '700',
  },
});
