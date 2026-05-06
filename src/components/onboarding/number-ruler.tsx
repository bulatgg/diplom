import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Spacing } from '@/constants/theme';

type NumberRulerProps = {
  value: number;
  suffix: string;
  min: number;
  max: number;
  step?: number;
  precision?: number;
  onChange: (value: number) => void;
};

export function NumberRuler({ value, suffix, min, max, step = 1, precision = 0, onChange }: NumberRulerProps) {
  const [draftValue, setDraftValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const clamp = (nextValue: number) => Math.min(max, Math.max(min, nextValue));

  const formattedValue = useMemo(() => formatNumber(value, precision), [precision, value]);

  useEffect(() => {
    if (!isEditing) {
      setDraftValue(formattedValue);
    }
  }, [formattedValue, isEditing]);

  function commitDraft() {
    setIsEditing(false);

    const normalizedText = draftValue.replace(',', '.').trim();
    if (!normalizedText) {
      setDraftValue(formattedValue);
      return;
    }

    const parsedValue = Number(normalizedText);
    if (Number.isNaN(parsedValue)) {
      setDraftValue(formattedValue);
      return;
    }

    const nextValue = roundByPrecision(clamp(parsedValue), precision);
    onChange(nextValue);
    setDraftValue(formatNumber(nextValue, precision));
  }

  function changeByStep(direction: -1 | 1) {
    const nextValue = roundByPrecision(clamp(value + step * direction), precision);
    onChange(nextValue);
    setDraftValue(formatNumber(nextValue, precision));
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.controls}>
        <Pressable style={styles.controlButton} onPress={() => changeByStep(-1)}>
          <Text style={styles.controlText}>-</Text>
        </Pressable>
        <View style={styles.valueBox}>
          <TextInput
            value={isEditing ? draftValue : formattedValue}
            onFocus={() => {
              setIsEditing(true);
              setDraftValue(formattedValue);
            }}
            onBlur={commitDraft}
            onSubmitEditing={commitDraft}
            onChangeText={setDraftValue}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.suffix}>{suffix}</Text>
        </View>
        <Pressable style={styles.controlButton} onPress={() => changeByStep(1)}>
          <Text style={styles.controlText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.ruler}>
        {Array.from({ length: 17 }).map((_, index) => (
          <View key={index} style={[styles.tick, index % 4 === 0 && styles.bigTick]} />
        ))}
      </View>
    </View>
  );
}

function formatNumber(value: number, precision: number) {
  return precision === 0 ? String(Math.round(value)) : value.toFixed(precision);
}

function roundByPrecision(value: number, precision: number) {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing.three,
    borderRadius: 30,
    backgroundColor: '#F8FFE9',
    gap: Spacing.three,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  controlButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17211A',
  },
  controlText: {
    color: '#F8FFE9',
    fontSize: 28,
    fontWeight: '900',
  },
  valueBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#17211A',
    fontSize: 54,
    lineHeight: 60,
    fontWeight: '900',
    textAlign: 'center',
    minWidth: 140,
  },
  suffix: {
    color: '#66705F',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  ruler: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.two,
    borderRadius: 18,
    backgroundColor: '#E7F6D3',
  },
  tick: {
    width: 2,
    height: 14,
    borderRadius: 2,
    backgroundColor: '#9BAB8E',
  },
  bigTick: {
    height: 28,
    backgroundColor: '#17211A',
  },
});
