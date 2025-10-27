import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

import CounterControls from '@/components/counter-controls';
import CounterDisplay from '@/components/counter-display';
import CounterHeader from '@/components/counter-header';
import CRTOverlay from '@/components/crt-overlay';
import { RetroColors } from '@/constants/theme';
import { useCounter } from '@/hooks/use-counter';

export default function CounterApp() {
  const { count, isAnimating, increment, decrement, reset, flashAnimation } = useCounter();

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
        <CounterHeader />
        
        <View style={styles.counterContainer}>
          <CounterDisplay value={count} isAnimating={isAnimating} />
        </View>

        <CounterControls 
          onIncrement={increment}
          onDecrement={decrement}
          onReset={reset}
        />
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
  counterContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
});