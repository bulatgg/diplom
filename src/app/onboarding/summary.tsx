import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';
import { calculateBmi, getBmiStatus, getWeightDeltaText } from '@/lib/body-metrics';

function formatGoal(goal: string | null) {
  if (goal === 'gain_muscle') {
    return 'Накачаться';
  }

  if (goal === 'lose_weight') {
    return 'Похудеть';
  }

  return 'Не выбрано';
}

function formatLevel(level: string | null) {
  if (level === 'beginner') {
    return 'Нуб';
  }

  if (level === 'intermediate') {
    return 'Средний';
  }

  if (level === 'advanced') {
    return 'Про';
  }

  return 'Не выбрано';
}

export default function SummaryScreen() {
  const router = useRouter();
  const { profile, completeOnboarding } = useOnboarding();
  const bmi = calculateBmi(profile.weightKg, profile.heightCm);

  async function startApp() {
    await completeOnboarding();
    router.replace('/home');
  }

  return (
    <OnboardingScreen eyebrow="Итог" title="Профиль готов" subtitle="Вот данные, которые мы сохранили локально. На их основе дальше будем строить тренировочный план.">
      <View style={styles.summaryCard}>
        <SummaryRow label="Цель" value={formatGoal(profile.goal)} />
        <SummaryRow label="Зоны" value={profile.muscleGroups.join(', ') || 'Все тело'} />
        <SummaryRow label="Рост" value={`${profile.heightCm} см`} />
        <SummaryRow label="Вес" value={`${profile.weightKg} кг`} />
        <SummaryRow label="Желаемый вес" value={`${profile.targetWeightKg} кг`} />
        <SummaryRow label="ИМТ" value={`${bmi.toFixed(1)} - ${getBmiStatus(bmi)}`} />
        <SummaryRow label="Форма" value={formatLevel(profile.fitnessLevel)} />
        <SummaryRow label="1ПМ" value={`${profile.strengthTest.estimatedOneRepMax.toFixed(1)} кг`} />
        <SummaryRow label="Тренировки" value={`${profile.trainingDaysPerWeek} раз/нед`} />
        <SummaryRow label="Оборудование" value={profile.equipment.join(', ') || 'Не выбрано'} />
      </View>
      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Комментарий по цели</Text>
        <Text style={styles.noteText}>{getWeightDeltaText(profile.weightKg, profile.targetWeightKg)}</Text>
      </View>
      <PrimaryButton label="Начать" onPress={startApp} />
    </OnboardingScreen>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: Spacing.three,
    borderRadius: 30,
    backgroundColor: '#F8FFE9',
    gap: Spacing.two,
  },
  row: {
    gap: 3,
    paddingBottom: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: '#DCE9CF',
  },
  rowLabel: {
    color: '#66705F',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  rowValue: {
    color: '#17211A',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
  },
  noteCard: {
    padding: Spacing.three,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  noteTitle: {
    color: '#F8FFE9',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: Spacing.one,
  },
  noteText: {
    color: '#B8C7B3',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
});
