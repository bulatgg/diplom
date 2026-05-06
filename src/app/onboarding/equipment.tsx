import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';

const equipmentOptions = ['Все', 'Штанга', 'Гантели', 'Турник', 'Тренажеры', 'Резинки', 'Коврик', 'Без оборудования'];

export default function EquipmentScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();

  function toggleEquipment(equipment: string) {
    if (equipment === 'Все') {
      updateProfile({ equipment: ['Все'] });
      return;
    }

    const withoutAll = profile.equipment.filter((item) => item !== 'Все');
    const nextEquipment = withoutAll.includes(equipment)
      ? withoutAll.filter((item) => item !== equipment)
      : [...withoutAll, equipment];

    updateProfile({ equipment: nextEquipment });
  }

  return (
    <OnboardingScreen eyebrow="Шаг 10" title="Какое есть оборудование?" subtitle="Можно выбрать все или только то, что реально доступно дома/в зале.">
      <View style={styles.grid}>
        {equipmentOptions.map((equipment) => {
          const selected = profile.equipment.includes(equipment);
          return (
            <Pressable key={equipment} onPress={() => toggleEquipment(equipment)} style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{equipment}</Text>
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton label="Продолжить" onPress={() => router.push('/onboarding/place')} />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  chipSelected: {
    backgroundColor: '#F8FFE9',
  },
  chipText: {
    color: '#F8FFE9',
    fontWeight: '900',
  },
  chipTextSelected: {
    color: '#17211A',
  },
});
