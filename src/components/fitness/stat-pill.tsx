import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';

type StatPillProps = {
  label: string;
  value: string;
};

export function StatPill({ label, value }: StatPillProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 96,
    padding: Spacing.three,
    borderRadius: 22,
    backgroundColor: '#17211A',
  },
  value: {
    color: '#F8FFE9',
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    marginTop: Spacing.one,
    color: '#B8C7B3',
    fontSize: 12,
    fontWeight: '600',
  },
});
