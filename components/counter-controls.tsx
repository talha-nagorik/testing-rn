import React from 'react';
import { StyleSheet, View } from 'react-native';
import RetroButton from './retro-button';

interface CounterControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export default function CounterControls({ onIncrement, onDecrement, onReset }: CounterControlsProps) {
  return (
    <View style={styles.controls}>
      <View style={styles.buttonRow}>
        <RetroButton label="−" onPress={onDecrement} color="magenta" />
        <RetroButton label="+" onPress={onIncrement} color="cyan" />
      </View>
      <RetroButton label="RESET" onPress={onReset} color="yellow" style={styles.resetButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    gap: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  resetButton: {
    alignSelf: 'center',
  },
});
