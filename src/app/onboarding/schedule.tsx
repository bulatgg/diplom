import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberRuler } from '@/components/onboarding/number-ruler';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/context/onboarding-context';
import { WeekStartDay } from '@/types/onboarding';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function ScheduleScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();

  function toggleDay(day: string) {
    const selectedTrainingDays = profile.selectedTrainingDays.includes(day)
      ? profile.selectedTrainingDays.filter((item) => item !== day)
      : [...profile.selectedTrainingDays, day];

    updateProfile({ selectedTrainingDays, trainingDaysPerWeek: selectedTrainingDays.length || profile.trainingDaysPerWeek });
  }

  function setWeekStart(weekStartDay: WeekStartDay) {
    updateProfile({ weekStartDay });
  }

  return (
    <OnboardingScreen eyebrow="Шаг 9" title="Как часто тренироваться?" subtitle="Выбери количество тренировок и удобные дни. Это станет основой будущего плана.">
      <NumberRuler value={profile.trainingDaysPerWeek} suffix="раза в неделю" min={1} max={7} onChange={(trainingDaysPerWeek) => updateProfile({ trainingDaysPerWeek })} />
      <View style={styles.dayGrid}>
        {days.map((day) => {
          const selected = profile.selectedTrainingDays.includes(day);
          return (
            <Pressable key={day} onPress={() => toggleDay(day)} style={[styles.dayChip, selected && styles.dayChipActive]}>
              <Text style={[styles.dayText, selected && styles.dayTextActive]}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.segmented}>
        <Pressable onPress={() => setWeekStart('monday')} style={[styles.segment, profile.weekStartDay === 'monday' && styles.segmentActive]}>
          <Text style={[styles.segmentText, profile.weekStartDay === 'monday' && styles.segmentTextActive]}>Неделя с Пн</Text>
        </Pressable>
        <Pressable onPress={() => setWeekStart('sunday')} style={[styles.segment, profile.weekStartDay === 'sunday' && styles.segmentActive]}>
          <Text style={[styles.segmentText, profile.weekStartDay === 'sunday' && styles.segmentTextActive]}>Неделя с Вс</Text>
        </Pressable>
      </View>
      <PrimaryButton label="Продолжить" onPress={() => router.push('/onboarding/equipment')} />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  dayChip: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  dayChipActive: {
    backgroundColor: '#DFF5CB',
  },
  dayText: {
    color: '#F8FFE9',
    fontWeight: '900',
  },
  dayTextActive: {
    color: '#17211A',
  },
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
});
