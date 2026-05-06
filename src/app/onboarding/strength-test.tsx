import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberRuler } from '@/components/onboarding/number-ruler';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';
import { estimateOneRepMax } from '@/lib/strength';
import { StrengthExercise } from '@/types/onboarding';

const exercises: { value: StrengthExercise; label: string }[] = [
  { value: 'bench', label: 'Жим лежа' },
  { value: 'squat', label: 'Присед' },
  { value: 'deadlift', label: 'Становая' },
];

export default function StrengthTestScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  const oneRepMax = useMemo(
    () => estimateOneRepMax(profile.strengthTest.weightKg, profile.strengthTest.reps),
    [profile.strengthTest.reps, profile.strengthTest.weightKg],
  );

  function updateStrengthTest(patch: Partial<typeof profile.strengthTest>) {
    const nextTest = {
      ...profile.strengthTest,
      ...patch,
    };

    nextTest.estimatedOneRepMax = estimateOneRepMax(nextTest.weightKg, nextTest.reps);
    updateProfile({ strengthTest: nextTest });
  }

  return (
    <OnboardingScreen eyebrow="Шаг 8" title="Оценка 1ПМ" subtitle="Выбери упражнение, вес и количество повторений. Приложение оценит примерный максимум на один повтор.">
      <View style={styles.exerciseRow}>
        {exercises.map((exercise) => {
          const selected = profile.strengthTest.exercise === exercise.value;
          return (
            <Pressable key={exercise.value} onPress={() => updateStrengthTest({ exercise: exercise.value })} style={[styles.exerciseChip, selected && styles.exerciseChipActive]}>
              <Text style={[styles.exerciseText, selected && styles.exerciseTextActive]}>{exercise.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <NumberRuler value={profile.strengthTest.weightKg} suffix="кг" min={10} max={300} step={5} onChange={(weightKg) => updateStrengthTest({ weightKg })} />
      <NumberRuler value={profile.strengthTest.reps} suffix="повт." min={1} max={15} onChange={(reps) => updateStrengthTest({ reps })} />
      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Твой расчетный 1ПМ</Text>
        <Text style={styles.resultValue}>{oneRepMax.toFixed(1)} кг</Text>
      </View>
      <PrimaryButton label="Продолжить" onPress={() => router.push('/onboarding/schedule')} />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  exerciseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  exerciseChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  exerciseChipActive: {
    backgroundColor: '#F8FFE9',
  },
  exerciseText: {
    color: '#F8FFE9',
    fontWeight: '900',
  },
  exerciseTextActive: {
    color: '#17211A',
  },
  resultCard: {
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  resultLabel: {
    color: '#B8C7B3',
    fontWeight: '900',
  },
  resultValue: {
    marginTop: Spacing.one,
    color: '#DFF5CB',
    fontSize: 42,
    fontWeight: '900',
  },
});
