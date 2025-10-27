import { RetroColors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function CounterHeader() {
  return (
    <View style={styles.header}>
      <Animated.Text style={styles.title}>COUNTER</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: RetroColors.neon.cyan,
    textShadowColor: RetroColors.neon.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 8,
  },
});
