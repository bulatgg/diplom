import React from 'react';
import { Pressable, StyleSheet, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';

type PrimaryButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: 'solid' | 'ghost';
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ label, variant = 'solid', style, ...props }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === 'ghost' && styles.ghost,
        pressed && styles.pressed,
        style,
      ]}
      {...props}>
      <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
    backgroundColor: '#DFF5CB',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  label: {
    color: '#17211A',
    fontSize: 16,
    fontWeight: '900',
  },
  ghostLabel: {
    color: '#FFFFFF',
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
});
