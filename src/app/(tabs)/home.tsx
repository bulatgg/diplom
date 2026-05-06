import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/fitness/app-screen';
import { Card } from '@/components/fitness/card';
import { StatPill } from '@/components/fitness/stat-pill';
import { Spacing } from '@/constants/theme';
import { workoutTemplates } from '@/data/fitness';
import { predictBenchPress } from '@/lib/strength';

const demoPrediction = predictBenchPress({
  weight: 80,
  reps: 6,
  weeks: 2,
  level: 'beginner',
  adherence: 0.9,
  recovery: 0.95,
});

export default function HomeScreen() {
  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Sport Mentor</Text>
        <Text style={styles.title}>Тренировки, прогноз силы и обмен планами</Text>
        <Text style={styles.subtitle}>
          Скелет дипломного приложения: рассчитываем жим, собираем планы и готовим базу для
          публикации тренировок.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatPill label="готовых плана" value={String(workoutTemplates.length)} />
        <StatPill label="прогноз 1RM" value={`${demoPrediction.predictedOneRepMax.toFixed(1)} кг`} />
      </View>

      <Card style={styles.accentCard}>
        <Text style={styles.cardEyebrow}>Ближайший модуль</Text>
        <Text style={styles.cardTitle}>Алгоритм жима лежа</Text>
        <Text style={styles.cardText}>
          Вводим вес и повторы, считаем текущий максимум по формулам Epley и Brzycki, затем строим
          прогноз на 2 недели.
        </Text>
        <Link href="/predict" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Открыть прогноз</Text>
          </Pressable>
        </Link>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Каркас MVP</Text>
        <Text style={styles.checkLine}>1. Профиль спортсмена и цель тренировок</Text>
        <Text style={styles.checkLine}>2. Генератор и каталог тренировок</Text>
        <Text style={styles.checkLine}>3. Прогноз силового результата</Text>
        <Text style={styles.checkLine}>4. Публикация пользовательских планов</Text>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  kicker: {
    color: '#62724A',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#17211A',
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '900',
  },
  subtitle: {
    color: '#60685D',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  accentCard: {
    backgroundColor: '#F6FFC9',
  },
  cardEyebrow: {
    color: '#6C792F',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: '#17211A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: Spacing.two,
  },
  cardText: {
    color: '#4F594C',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#17211A',
  },
  primaryButtonText: {
    color: '#F8FFE9',
    fontWeight: '800',
  },
  checkLine: {
    color: '#4F594C',
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '600',
  },
});
