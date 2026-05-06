import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { Spacing } from '@/constants/theme';

const steps = ['Анализируем ответы', 'Подбираем упражнения', 'Рассчитываем нагрузку', 'Формируем план'];

export default function GeneratingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((current) => Math.min(100, current + 12));
    }, 220);

    const timeoutId = setTimeout(() => {
      router.replace('/onboarding/summary');
    }, 2300);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <OnboardingScreen eyebrow="Почти готово" title="Разрабатываем индивидуальный план" subtitle="Пока это заглушка генерации. Позже здесь будет реальный алгоритм подбора тренировок.">
      <View style={styles.progressCard}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      <View style={styles.steps}>
        {steps.map((step, index) => (
          <Text key={step} style={[styles.step, progress >= (index + 1) * 25 && styles.stepActive]}>
            {step}
          </Text>
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    padding: Spacing.three,
    borderRadius: 30,
    backgroundColor: '#F8FFE9',
    gap: Spacing.two,
  },
  progressTrack: {
    height: 18,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#DCE9CF',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#17211A',
  },
  progressText: {
    color: '#17211A',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  steps: {
    gap: Spacing.two,
  },
  step: {
    color: '#73816F',
    fontSize: 16,
    fontWeight: '800',
  },
  stepActive: {
    color: '#DFF5CB',
  },
});
