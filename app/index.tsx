import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import CounterDisplay from '@/components/counter-display';
import CRTOverlay from '@/components/crt-overlay';
import RetroButton from '@/components/retro-button';
import { RetroColors } from '@/constants/theme';

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const flashAnimation = useSharedValue(0);

  const triggerFlash = () => {
    flashAnimation.value = withTiming(1, { duration: 100 }, () => {
      flashAnimation.value = withTiming(0, { duration: 100 });
    });
  };

  const increment = () => {
    triggerFlash();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCount((prev) => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
      return prev + 1;
    });
  };

  const decrement = () => {
    triggerFlash();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCount((prev) => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
      return prev - 1;
    });
  };

  const reset = () => {
    triggerFlash();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setCount(0);
  };

  const flashStyle = useAnimatedStyle(() => {
    const opacity = interpolate(flashAnimation.value, [0, 1], [0, 0.3]);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: RetroColors.neon.cyan,
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={flashStyle} pointerEvents="none" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Animated.Text style={styles.title}>COUNTER</Animated.Text>
        </View>

        <View style={styles.counterContainer}>
          <CounterDisplay value={count} isAnimating={isAnimating} />
        </View>

        <View style={styles.controls}>
          <View style={styles.buttonRow}>
            <RetroButton label="−" onPress={decrement} color="magenta" />
            <RetroButton label="+" onPress={increment} color="cyan" />
          </View>
          <RetroButton label="RESET" onPress={reset} color="yellow" style={styles.resetButton} />
        </View>
      </View>

      <CRTOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RetroColors.background.dark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    zIndex: 1,
  },
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
  counterContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
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

