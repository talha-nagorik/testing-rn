import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { formatNumber, getNumberColor } from '@/utils/counter-utils';

const { width } = Dimensions.get('window');

interface CounterDisplayProps {
  value: number;
  isAnimating: boolean;
}

export default function CounterDisplay({ value, isAnimating }: CounterDisplayProps) {
  const previousValue = React.useRef(value);
  const rollAnimation = useSharedValue(0);
  const glowOpacity = useSharedValue(0.3);
  const pulseAnimation = useSharedValue(0);

  React.useEffect(() => {
    if (value !== previousValue.current) {
      const isReset = value === 0 && previousValue.current !== 0;
      const isMultipleOfTen = value !== 0 && value % 10 === 0;
      
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

      previousValue.current = value;
    }
  }, [glowOpacity, rollAnimation, value]);

  // Continuous subtle pulse animation
  React.useEffect(() => {
    pulseAnimation.value = withTiming(1, { duration: 2000 }, () => {
      pulseAnimation.value = withTiming(0, { duration: 2000 });
    });
  }, [pulseAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        translateY: interpolate(
          rollAnimation.value,
          [0, 1],
          [0, -20],
          Extrapolation.CLAMP
        )
      },
      { 
        rotateX: interpolate(
          rollAnimation.value,
          [0, 1],
          [0, 15],
          Extrapolation.CLAMP
        ) + 'deg'
      }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      glowOpacity.value,
      [0, 1],
      [0.3, 1],
      Extrapolation.CLAMP
    ),
  }));

  const pulseStyle = useAnimatedStyle(() => {
    const pulse = interpolate(pulseAnimation.value, [0, 1], [0, 1]);
    return {
      opacity: 0.3 + pulse * 0.1,
    };
  });

  const displayStyle = useAnimatedStyle(() => {
    const combinedOpacity = glowOpacity.value;
    return {
      opacity: combinedOpacity,
    };
  });

  return (
    <View style={styles.container}>
      {/* Outer glow */}
      <Animated.View style={[styles.outline, pulseStyle, glowStyle, { borderColor: getNumberColor(value) }]}>
        <View style={styles.innerContainer}>
          <Animated.Text style={[styles.number, displayStyle, { color: getNumberColor(value), textShadowColor: getNumberColor(value) }]}>
            {formatNumber(value)}
          </Animated.Text>
        </View>
      </Animated.View>

      {/* Main counter */}
      <Animated.View style={[styles.counter, animatedStyle, { borderColor: getNumberColor(value), shadowColor: getNumberColor(value) }]}>
        <View style={styles.counterInner}>
          <Animated.Text style={[styles.number, displayStyle, { color: getNumberColor(value), textShadowColor: getNumberColor(value) }]}>
            {formatNumber(value)}
          </Animated.Text>
        </View>
        
        {/* Rolling effect overlay */}
        <Animated.View style={[styles.rollOverlay, animatedStyle]} />
      </Animated.View>

      {/* Scanline overlay for CRT effect */}
      <View style={styles.scanlineOverlay}>
        <View style={styles.scanline} />
        <View style={[styles.scanline, styles.scanlineMiddle]} />
        <View style={styles.scanline} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  counter: {
    width: width * 0.7,
    height: 150,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    shadowOpacity: 0.8,
    elevation: 10,
  },
  outline: {
    position: 'absolute',
    width: width * 0.75,
    height: 170,
    borderRadius: 25,
    borderWidth: 2,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  number: {
    fontSize: 72,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 8,
  },
  scanlineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  scanline: {
    height: 1,
    backgroundColor: 'rgba(0, 255, 240, 0.3)',
    width: '100%',
  },
  scanlineMiddle: {
    backgroundColor: 'rgba(0, 255, 240, 0.2)',
  },
  rollOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
  },
});

