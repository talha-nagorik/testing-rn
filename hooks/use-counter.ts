import * as Haptics from 'expo-haptics';
import { useRef, useState } from 'react';
import { useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

export interface CounterState {
  count: number;
  isAnimating: boolean;
}

export interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export interface CounterAnimations {
  rollAnimation: any;
  glowOpacity: any;
  flashAnimation: any;
}

export function useCounter(): CounterState & CounterActions & CounterAnimations {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(count);
  
  const rollAnimation = useSharedValue(0);
  const glowOpacity = useSharedValue(0.3);
  const flashAnimation = useSharedValue(0);

  const triggerFlash = () => {
    flashAnimation.value = withTiming(1, { duration: 100 }, () => {
      flashAnimation.value = withTiming(0, { duration: 100 });
    });
  };

  const updateCounter = (newValue: number) => {
    const isReset = newValue === 0 && previousValue.current !== 0;
    const isMultipleOfTen = newValue !== 0 && newValue % 10 === 0;
    
    triggerFlash();
    
    if (isReset) {
      // Special reset animation - full roll
      rollAnimation.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 200 })
      );
      glowOpacity.value = withTiming(1, { duration: 150 }, () => {
        glowOpacity.value = withTiming(0.3, { duration: 600 });
      });
    } else if (isMultipleOfTen) {
      // Special animation for multiples of 10 - double roll
      rollAnimation.value = withSequence(
        withTiming(0.5, { duration: 150 }),
        withTiming(0, { duration: 150 }),
        withTiming(0.3, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
      glowOpacity.value = withTiming(1, { duration: 200 }, () => {
        glowOpacity.value = withTiming(0.3, { duration: 500 });
      });
    } else {
      // Regular animation - subtle roll
      rollAnimation.value = withTiming(0.2, { duration: 100 }, () => {
        rollAnimation.value = withTiming(0, { duration: 100 });
      });
      glowOpacity.value = withTiming(1, { duration: 100 }, () => {
        glowOpacity.value = withTiming(0.3, { duration: 400 });
      });
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    previousValue.current = newValue;
    setCount(newValue);
  };

  const increment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateCounter(count + 1);
  };

  const decrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateCounter(count - 1);
  };

  const reset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    updateCounter(0);
  };

  return {
    count,
    isAnimating,
    increment,
    decrement,
    reset,
    rollAnimation,
    glowOpacity,
    flashAnimation,
  };
}
