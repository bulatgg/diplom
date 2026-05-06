import { useRouter, type Href } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/fitness/app-screen';
import { Card } from '@/components/fitness/card';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';

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

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, resetOnboarding } = useOnboarding();
  const profileRows = [
    ['Цель', formatGoal(profile.goal)],
    ['Уровень', formatLevel(profile.fitnessLevel)],
    ['Место', profile.trainingPlace ?? 'Не выбрано'],
    ['Рост', `${profile.heightCm} см`],
    ['Вес', `${profile.weightKg} кг`],
    ['Тренировки', `${profile.trainingDaysPerWeek} раза в неделю`],
  ];

  async function replayOnboarding() {
    await resetOnboarding();
    router.replace('/onboarding' as Href);
  }

  return (
    <AppScreen>
      <Text style={styles.title}>Профиль</Text>
      <Text style={styles.subtitle}>
        Здесь хранятся локальные данные спортсмена, которые влияют на генерацию планов и прогноз результата.
      </Text>

      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SM</Text>
        </View>
        <Text style={styles.name}>Спортсмен</Text>
        <Text style={styles.caption}>Локальный профиль для MVP</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Параметры</Text>
        {profileRows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
          </View>
        ))}
        <Pressable style={styles.resetButton} onPress={replayOnboarding}>
          <Text style={styles.resetButtonText}>Пройти анкету заново</Text>
        </Pressable>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#17211A',
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    color: '#60685D',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#17211A',
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6FFC9',
  },
  avatarText: {
    color: '#17211A',
    fontSize: 28,
    fontWeight: '900',
  },
  name: {
    marginTop: Spacing.two,
    color: '#F8FFE9',
    fontSize: 24,
    fontWeight: '900',
  },
  caption: {
    color: '#B8C7B3',
    fontWeight: '700',
  },
  cardTitle: {
    color: '#17211A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: Spacing.two,
  },
  row: {
    gap: 3,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE9DE',
  },
  rowLabel: {
    color: '#687064',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  rowValue: {
    color: '#17211A',
    fontSize: 16,
    fontWeight: '900',
  },
  resetButton: {
    alignItems: 'center',
    marginTop: Spacing.three,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#17211A',
  },
  resetButtonText: {
    color: '#F8FFE9',
    fontWeight: '900',
  },
});
