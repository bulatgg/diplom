import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/fitness/app-screen';
import { Card } from '@/components/fitness/card';
import { Spacing } from '@/constants/theme';
import { exercises, workoutTemplates } from '@/data/fitness';
import { getTrainingWeight } from '@/lib/strength';

const demoOneRepMax = 95;

export default function WorkoutsScreen() {
  return (
    <AppScreen>
      <Text style={styles.title}>Планы тренировок</Text>
      <Text style={styles.subtitle}>
        Пока это моковые шаблоны. Позже здесь появятся фильтры по цели, месту, уровню и сохранение
        в профиль пользователя.
      </Text>

      {workoutTemplates.map((template) => (
        <Card key={template.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.templateTitle}>{template.title}</Text>
            <Text style={styles.badge}>{template.place === 'gym' ? 'зал' : 'дом'}</Text>
          </View>
          <Text style={styles.description}>{template.description}</Text>
          <Text style={styles.meta}>
            {template.daysPerWeek} дн/нед · {template.level} · лайков: {template.likes}
          </Text>

          <View style={styles.exerciseList}>
            {template.exercises.map((item) => {
              const exercise = exercises.find((entry) => entry.id === item.exerciseId);
              const weight = item.intensityPercent
                ? `${getTrainingWeight(demoOneRepMax, item.intensityPercent)} кг`
                : 'по самочувствию';

              return (
                <View key={`${template.id}-${item.exerciseId}`} style={styles.exerciseRow}>
                  <Text style={styles.exerciseName}>{exercise?.name ?? item.exerciseId}</Text>
                  <Text style={styles.exerciseParams}>
                    {item.sets}x{item.reps} · {weight} · отдых {item.restSeconds}с
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>
      ))}
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
  card: {
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  templateTitle: {
    flex: 1,
    color: '#17211A',
    fontSize: 22,
    fontWeight: '900',
  },
  badge: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#E7F6D3',
    color: '#45582D',
    fontSize: 12,
    fontWeight: '900',
  },
  description: {
    color: '#4F594C',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  meta: {
    color: '#7A8177',
    fontSize: 13,
    fontWeight: '700',
  },
  exerciseList: {
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  exerciseRow: {
    padding: Spacing.two,
    borderRadius: 16,
    backgroundColor: '#F7F4EC',
  },
  exerciseName: {
    color: '#17211A',
    fontWeight: '800',
  },
  exerciseParams: {
    marginTop: 3,
    color: '#687064',
    fontSize: 13,
    fontWeight: '600',
  },
});
