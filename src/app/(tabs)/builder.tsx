import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/fitness/app-screen';
import { Card } from '@/components/fitness/card';
import { Spacing } from '@/constants/theme';

const builderSteps = [
  'Название и описание тренировки',
  'Цель: сила, масса, похудение или выносливость',
  'Место: дом или зал',
  'Список упражнений, подходы, повторы и отдых',
  'Публикация в общий каталог',
];

export default function BuilderScreen() {
  return (
    <AppScreen>
      <Text style={styles.title}>Создание тренировки</Text>
      <Text style={styles.subtitle}>
        Здесь будет конструктор пользовательских планов. Сейчас экран показывает структуру будущей
        формы, чтобы мы уже понимали логику модуля.
      </Text>

      <Card style={styles.formPreview}>
        <Text style={styles.cardTitle}>Черновик формы</Text>
        {builderSteps.map((step, index) => (
          <View key={step} style={styles.stepRow}>
            <Text style={styles.stepIndex}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Что добавим дальше</Text>
        <Text style={styles.text}>
          Реальные поля ввода, выбор упражнений, локальное сохранение черновика и кнопку
          «Опубликовать» через Supabase.
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
  formPreview: {
    backgroundColor: '#FFF4D6',
  },
  cardTitle: {
    color: '#17211A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: Spacing.two,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: 9,
  },
  stepIndex: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#17211A',
    color: '#F8FFE9',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '900',
  },
  stepText: {
    flex: 1,
    color: '#4F594C',
    fontSize: 15,
    fontWeight: '700',
  },
  text: {
    color: '#4F594C',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
});
