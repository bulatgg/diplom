import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';

type OptionCardProps = {
  title: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
};

export function OptionCard({ title, description, selected, onPress }: OptionCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, selected && styles.selected, pressed && styles.pressed]}>
      <View style={[styles.dot, selected && styles.dotSelected]} />
      <View style={styles.textWrapper}>
        <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
        {description ? <Text style={[styles.description, selected && styles.descriptionSelected]}>{description}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  selected: {
    backgroundColor: '#F8FFE9',
    borderColor: '#DFF5CB',
  },
  pressed: {
    opacity: 0.8,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#B8C7B3',
  },
  dotSelected: {
    borderColor: '#17211A',
    backgroundColor: '#17211A',
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    color: '#F8FFE9',
    fontSize: 18,
    fontWeight: '900',
  },
  titleSelected: {
    color: '#17211A',
  },
  description: {
    marginTop: 4,
    color: '#B8C7B3',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  descriptionSelected: {
    color: '#566052',
  },
});
