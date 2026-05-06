import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen } from '@/components/fitness/app-screen';
import { Card } from '@/components/fitness/card';
import { StatPill } from '@/components/fitness/stat-pill';
import { Spacing } from '@/constants/theme';
import { predictBenchPress } from '@/lib/strength';
import { AthleteLevel } from '@/types/fitness';

const levels: { label: string; value: AthleteLevel }[] = [
  { label: 'Новичок', value: 'beginner' },
  { label: 'Средний', value: 'intermediate' },
  { label: 'Опытный', value: 'advanced' },
];

export default function PredictScreen() {
  const [weight, setWeight] = useState('80');
  const [reps, setReps] = useState('6');
  const [level, setLevel] = useState<AthleteLevel>('beginner');

  const prediction = useMemo(
    () =>
      predictBenchPress({
        weight: Number(weight) || 0,
        reps: Number(reps) || 1,
        weeks: 2,
        level,
        adherence: 0.9,
        recovery: 0.95,
      }),
    [level, reps, weight],
  );

  return (
    <AppScreen keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Прогноз жима</Text>
      <Text style={styles.subtitle}>
        Первый рабочий алгоритм приложения: оценка 1RM и прогноз результата через две недели.
      </Text>

      <Card style={styles.inputCard}>
        <Text style={styles.cardTitle}>Текущий подход</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Вес, кг</Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={styles.input}
              placeholder="80"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Повторы</Text>
            <TextInput
              value={reps}
              onChangeText={setReps}
              keyboardType="numeric"
              style={styles.input}
              placeholder="6"
            />
          </View>
        </View>

        <Text style={styles.label}>Уровень</Text>
        <View style={styles.levelRow}>
          {levels.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => setLevel(item.value)}
              style={[styles.levelButton, level === item.value && styles.levelButtonActive]}>
              <Text style={[styles.levelText, level === item.value && styles.levelTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <View style={styles.statsRow}>
        <StatPill label="текущий 1RM" value={`${prediction.currentOneRepMax.toFixed(1)} кг`} />
        <StatPill label="через 2 недели" value={`${prediction.predictedOneRepMax.toFixed(1)} кг`} />
      </View>

      <Card>
        <Text style={styles.cardTitle}>Диапазон прогноза</Text>
        <Text style={styles.resultText}>
          Осторожно: {prediction.conservativeOneRepMax.toFixed(1)} кг · Оптимистично:{' '}
          {prediction.optimisticOneRepMax.toFixed(1)} кг
        </Text>
        <Text style={styles.note}>
          Формула учитывает уровень, регулярность и восстановление. Позже добавим сон, вес тела,
          историю тренировок и фактическое выполнение плана.
        </Text>
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
  inputCard: {
    backgroundColor: '#EEF8E7',
  },
  cardTitle: {
    color: '#17211A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: Spacing.two,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    color: '#566052',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
    marginTop: Spacing.two,
  },
  input: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE8D4',
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    color: '#17211A',
    fontSize: 18,
    fontWeight: '800',
  },
  levelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  levelButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  levelButtonActive: {
    backgroundColor: '#17211A',
  },
  levelText: {
    color: '#566052',
    fontWeight: '800',
  },
  levelTextActive: {
    color: '#F8FFE9',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  resultText: {
    color: '#17211A',
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '800',
  },
  note: {
    marginTop: Spacing.two,
    color: '#60685D',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
});
