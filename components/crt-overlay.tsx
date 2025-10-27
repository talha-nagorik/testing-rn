import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { RetroColors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function CRTOverlay() {
  const scanlineAnimation = useSharedValue(0);

  React.useEffect(() => {
    scanlineAnimation.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      false
    );
  }, [scanlineAnimation]);

  const scanlineStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scanlineAnimation.value, [0, 1], [-height, height]);
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Grid Background */}
      <Svg width={width} height={height} style={styles.grid}>
        <Defs>
          <LinearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={RetroColors.grid.secondary} stopOpacity="0.3" />
            <Stop offset="50%" stopColor={RetroColors.grid.primary} stopOpacity="0.2" />
            <Stop offset="100%" stopColor={RetroColors.grid.secondary} stopOpacity="0.3" />
          </LinearGradient>
        </Defs>
        
        {/* Horizontal lines */}
        {Array.from({ length: 30 }).map((_, i) => (
          <Rect
            key={`h-${i}`}
            x="0"
            y={i * 40}
            width={width}
            height="1"
            fill="url(#gridGradient)"
          />
        ))}
        
        {/* Vertical lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Rect
            key={`v-${i}`}
            x={i * 30}
            y="0"
            width="1"
            height={height}
            fill="url(#gridGradient)"
          />
        ))}
      </Svg>

      {/* CRT Scanline Animation */}
      <Animated.View style={[styles.scanline, scanlineStyle]}>
        <View style={styles.scanlineInner} />
      </Animated.View>

      {/* Corner decorations */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />

      {/* Vignette Effect */}
      <View style={styles.vignette} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.15,
  },
  scanline: {
    position: 'absolute',
    width: '100%',
    height: 2,
    top: 0,
    left: 0,
  },
  scanlineInner: {
    flex: 1,
    backgroundColor: 'rgba(0, 255, 240, 0.3)',
    shadowColor: '#00fff0',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'rgba(0, 255, 240, 0.3)',
    borderWidth: 2,
  },
  topLeft: {
    top: 10,
    left: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 10,
    right: 10,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  vignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: RetroColors.background.dark,
    opacity: 0.3,
  },
});

