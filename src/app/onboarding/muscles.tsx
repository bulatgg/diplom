import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';

const muscleGroups = ['Грудь', 'Спина', 'Плечи', 'Руки', 'Пресс', 'Ноги', 'Ягодицы'];

export default function MusclesScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  const [selectedGroups, setSelectedGroups] = useState<string[]>(profile.muscleGroups.length ? profile.muscleGroups : ['Все тело']);

  function toggleGroup(group: string) {
    if (group === 'Все тело') {
      setSelectedGroups(['Все тело']);
      return;
    }

    setSelectedGroups((current) => {
      const withoutAll = current.filter((item) => item !== 'Все тело');
      if (withoutAll.includes(group)) {
        return withoutAll.filter((item) => item !== group);
      }

      return [...withoutAll, group];
    });
  }

  async function continueNext() {
    await updateProfile({ muscleGroups: selectedGroups.length ? selectedGroups : ['Все тело'] });
    router.push('/onboarding/height');
  }

  return (
    <OnboardingScreen eyebrow="Шаг 3" title="Какие зоны проработать?" subtitle="Схему человека пока делаем упрощенно: кликабельные зоны подсвечиваются при выборе.">
      <View style={styles.bodyMap}>
        {['Плечи', 'Грудь', 'Руки', 'Пресс', 'Спина', 'Ноги'].map((group) => {
          const selected = selectedGroups.includes(group) || selectedGroups.includes('Все тело');
          return (
            <Pressable key={group} onPress={() => toggleGroup(group)} style={[styles.bodyPart, selected && styles.bodyPartSelected]}>
              <Text style={[styles.bodyPartText, selected && styles.bodyPartTextSelected]}>{group}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.grid}>
        <Pressable onPress={() => toggleGroup('Все тело')} style={[styles.chip, selectedGroups.includes('Все тело') && styles.chipSelected]}>
          <Text style={[styles.chipText, selectedGroups.includes('Все тело') && styles.chipTextSelected]}>Все тело</Text>
        </Pressable>
        {muscleGroups.map((group) => {
          const selected = selectedGroups.includes(group);
          return (
            <Pressable key={group} onPress={() => toggleGroup(group)} style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{group}</Text>
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton label="Продолжить" onPress={continueNext} />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  bodyMap: {
    minHeight: 300,
    padding: Spacing.three,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  bodyPart: {
    minWidth: 150,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  bodyPartSelected: {
    backgroundColor: '#DFF5CB',
  },
  bodyPartText: {
    color: '#F8FFE9',
    fontWeight: '900',
  },
  bodyPartTextSelected: {
    color: '#17211A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  chipSelected: {
    backgroundColor: '#F8FFE9',
  },
  chipText: {
    color: '#F8FFE9',
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#17211A',
  },
});
