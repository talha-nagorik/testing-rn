import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

interface ParticleProps {
  delay: number;
  translateX: number;
  translateY: number;
  color: string;
  onComplete: () => void;
}

function Particle({ delay, translateX, translateY, color, onComplete }: ParticleProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withDelay(delay, withTiming(0, { duration: 800 }));
    scale.value = withDelay(delay, withTiming(0, { duration: 800 }, () => {
      scheduleOnRN(onComplete);
    }));
  }, [delay, onComplete, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX * opacity.value },
      { translateY: translateY * opacity.value - 20 },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        { backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
}

interface ParticleEffectProps {
  color: string;
  particleCount?: number;
}

export default function ParticleEffect({ color, particleCount = 12 }: ParticleEffectProps) {
  const [particles, setParticles] = React.useState<{ id: number; translateX: number; translateY: number }[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    // Generate random particle positions
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      translateX: (Math.random() - 0.5) * 100,
      translateY: (Math.random() - 0.5) * 100,
    }));
    
    setParticles(newParticles);
  }, [particleCount]);

  const removeParticle = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  if (!mounted || particles.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={Math.random() * 200}
          translateX={particle.translateX}
          translateY={particle.translateY}
          color={color}
          onComplete={() => removeParticle(particle.id)}
        />
      ))}
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
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});

