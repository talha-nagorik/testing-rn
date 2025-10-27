import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { RetroColors } from '@/constants/theme';
import ParticleEffect from './particle-effect';

interface RetroButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label: string;
  color?: 'cyan' | 'magenta' | 'yellow' | 'green';
  style?: TouchableOpacityProps['style'];
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function RetroButton({ label, color = 'cyan', style, ...props }: RetroButtonProps) {
  const [showParticles, setShowParticles] = useState(false);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);

  const colorMap = {
    cyan: RetroColors.neon.cyan,
    magenta: RetroColors.neon.magenta,
    yellow: RetroColors.neon.yellow,
    green: RetroColors.neon.green,
  };

  const selectedColor = colorMap[color];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: selectedColor,
    shadowColor: selectedColor,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePress = () => {
    setShowParticles(true);
    
    // Scale animation
    scale.value = withSequence(
      withSpring(0.9, { damping: 8 }),
      withSpring(1, { damping: 8 })
    );

    // Glow pulse
    glowOpacity.value = withSequence(
      withSpring(1, { damping: 8 }),
      withSpring(0.5, { damping: 8 })
    );

    // Hide particles after animation
    setTimeout(() => setShowParticles(false), 800);
  };

  return (
    <AnimatedTouchable
      style={[styles.button, { borderColor: selectedColor, shadowColor: selectedColor }, animatedStyle, style]}
      onPressIn={handlePress}
      {...props}
    >
      {/* Glow outline */}
      <Animated.View
        style={[
          styles.glowOutline,
          { borderColor: selectedColor, shadowColor: selectedColor },
          glowStyle,
        ]}
      />

      {/* Button content */}
      <Text style={[styles.label, { color: selectedColor }]}>{label}</Text>

      {/* Particle effect */}
      {showParticles && <ParticleEffect color={selectedColor} particleCount={15} />}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 100,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowOpacity: 0.8,
    elevation: 10,
  },
  glowOutline: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 17,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    shadowOpacity: 0.6,
  },
  label: {
    fontSize: 28,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

