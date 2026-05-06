import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen } from '@/components/fitness/app-screen';
import { Card } from '@/components/fitness/card';
import { Spacing } from '@/constants/theme';
import { exercises } from '@/data/fitness';
import { Exercise } from '@/types/fitness';

function getFirstLetter(name: string) {
  return name.trim().charAt(0).toLocaleUpperCase('ru-RU');
}

function groupExercisesByLetter(items: Exercise[]) {
  return items.reduce<Record<string, Exercise[]>>((groups, exercise) => {
    const letter = getFirstLetter(exercise.name);
    groups[letter] = groups[letter] ? [...groups[letter], exercise] : [exercise];
    return groups;
  }, {});
}

function formatDifficulty(difficulty?: Exercise['difficulty']) {
  if (difficulty === 'beginner') {
    return 'Новичок';
  }

  if (difficulty === 'intermediate') {
    return 'Средний';
  }

  if (difficulty === 'advanced') {
    return 'Про';
  }

  return 'Любой уровень';
}

export default function ExercisesScreen() {
  const [query, setQuery] = useState('');
  const filteredExercises = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU');

    return exercises
      .filter((exercise) => exercise.name.toLocaleLowerCase('ru-RU').includes(normalizedQuery))
      .sort((first, second) => first.name.localeCompare(second.name, 'ru-RU'));
  }, [query]);

  const groupedExercises = useMemo(() => groupExercisesByLetter(filteredExercises), [filteredExercises]);
  const letters = Object.keys(groupedExercises).sort((first, second) => first.localeCompare(second, 'ru-RU'));

  return (
    <AppScreen keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Упражнения</Text>
      <Text style={styles.subtitle}>
        Библиотека упражнений. Сейчас здесь три базовых движения, позже добавим большую базу,
        изображения, видео и фильтры по мышцам.
      </Text>

      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Поиск упражнения"
          placeholderTextColor="#8A9284"
          style={styles.searchInput}
        />
        <Pressable style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.filterButtonText}>Фильтр</Text>
        </Pressable>
      </View>

      {letters.length ? (
        letters.map((letter) => (
          <View key={letter} style={styles.section}>
            <View style={styles.letterBadge}>
              <Text style={styles.letterText}>{letter}</Text>
            </View>
            {groupedExercises[letter].map((exercise) => (
              <Card key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.exerciseIcon}>
                    <Text style={styles.exerciseIconText}>{getFirstLetter(exercise.name)}</Text>
                  </View>
                  <View style={styles.cardTitleWrapper}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseMeta}>
                      {exercise.muscleGroup} · {exercise.equipment} · {formatDifficulty(exercise.difficulty)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              </Card>
            ))}
          </View>
        ))
      ) : (
        <Card>
          <Text style={styles.emptyTitle}>Ничего не найдено</Text>
          <Text style={styles.emptyText}>Попробуй изменить запрос или позже воспользоваться фильтром.</Text>
        </Card>
      )}
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
  searchRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  searchInput: {
    flex: 1,
    minHeight: 54,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E2D6',
    color: '#17211A',
    fontSize: 16,
    fontWeight: '700',
  },
  filterButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    backgroundColor: '#17211A',
  },
  filterButtonText: {
    color: '#F8FFE9',
    fontWeight: '900',
  },
  section: {
    gap: Spacing.two,
  },
  letterBadge: {
    alignSelf: 'flex-start',
    minWidth: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#DFF5CB',
  },
  letterText: {
    color: '#17211A',
    fontSize: 22,
    fontWeight: '900',
  },
  exerciseCard: {
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  exerciseIcon: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#17211A',
  },
  exerciseIconText: {
    color: '#DFF5CB',
    fontSize: 24,
    fontWeight: '900',
  },
  cardTitleWrapper: {
    flex: 1,
  },
  exerciseName: {
    color: '#17211A',
    fontSize: 21,
    fontWeight: '900',
  },
  exerciseMeta: {
    marginTop: 3,
    color: '#66705F',
    fontSize: 13,
    fontWeight: '800',
  },
  exerciseDescription: {
    color: '#4F594C',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  emptyTitle: {
    color: '#17211A',
    fontSize: 20,
    fontWeight: '900',
  },
  emptyText: {
    marginTop: Spacing.one,
    color: '#60685D',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
});
