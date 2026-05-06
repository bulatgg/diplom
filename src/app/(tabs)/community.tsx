import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/fitness/app-screen';
import { Card } from '@/components/fitness/card';
import { Spacing } from '@/constants/theme';
import { workoutTemplates } from '@/data/fitness';

export default function CommunityScreen() {
  return (
    <AppScreen>
      <Text style={styles.title}>Обмен тренировками</Text>
      <Text style={styles.subtitle}>
        Будущий публичный каталог: пользователи смогут публиковать планы, сохранять чужие и
        адаптировать веса под свой максимум.
      </Text>

      {workoutTemplates
        .filter((template) => template.isPublic)
        .map((template) => (
          <Card key={template.id} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.likes}>♥ {template.likes}</Text>
            </View>
            <Text style={styles.author}>Автор: {template.author}</Text>
            <Text style={styles.description}>{template.description}</Text>
            <Text style={styles.footer}>Можно скопировать · Можно адаптировать · {template.daysPerWeek} дн/нед</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  templateTitle: {
    flex: 1,
    color: '#17211A',
    fontSize: 22,
    fontWeight: '900',
  },
  likes: {
    color: '#C44935',
    fontWeight: '900',
  },
  author: {
    color: '#66705F',
    fontSize: 13,
    fontWeight: '800',
  },
  description: {
    color: '#4F594C',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  footer: {
    color: '#7A8177',
    fontSize: 13,
    fontWeight: '700',
  },
});
