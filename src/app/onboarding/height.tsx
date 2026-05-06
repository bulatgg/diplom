import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberRuler } from '@/components/onboarding/number-ruler';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';
import { cmToFeet, feetToCm } from '@/lib/units';
import { UnitSystem } from '@/types/onboarding';

export default function HeightScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  const isMetric = profile.heightUnit === 'metric';
  const displayedHeight = isMetric ? profile.heightCm : cmToFeet(profile.heightCm);

  async function setUnit(heightUnit: UnitSystem) {
    await updateProfile({ heightUnit });
  }

  function updateHeight(displayValue: number) {
    const heightCm = isMetric ? Math.round(displayValue) : feetToCm(displayValue);
    updateProfile({ heightCm });
  }

  return (
    <OnboardingScreen eyebrow="Шаг 4" title="Укажи свой рост" subtitle="Можно менять значение кнопками или нажать на цифру и ввести вручную.">
      <View style={styles.segmented}>
        <Pressable onPress={() => setUnit('metric')} style={[styles.segment, isMetric && styles.segmentActive]}>
          <Text style={[styles.segmentText, isMetric && styles.segmentTextActive]}>Сантиметры</Text>
        </Pressable>
        <Pressable onPress={() => setUnit('imperial')} style={[styles.segment, !isMetric && styles.segmentActive]}>
          <Text style={[styles.segmentText, !isMetric && styles.segmentTextActive]}>Футы</Text>
        </Pressable>
      </View>
      <NumberRuler
        value={displayedHeight}
        suffix={isMetric ? 'см' : 'ft'}
        min={isMetric ? 120 : 4}
        max={isMetric ? 230 : 7.5}
        step={isMetric ? 1 : 0.1}
        precision={isMetric ? 0 : 1}
        onChange={updateHeight}
      />
      <Text style={styles.hint}>Сохраняем внутри: {profile.heightCm} см</Text>
      <PrimaryButton label="Продолжить" onPress={() => router.push('/onboarding/weight')} />
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
  hint: {
    color: '#B8C7B3',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
