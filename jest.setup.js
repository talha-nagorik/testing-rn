/**
 * Jest Setup File for React Native Testing
 * 
 * This file configures mocks and global test setup for our React Native app.
 * It runs before each test file, ensuring consistent mocking across all tests.
 */

/* eslint-env jest */
/* global jest, beforeAll, afterAll */

// Mock expo-haptics
// Haptics require native device capabilities that aren't available in tests
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn().mockResolvedValue(undefined),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  notificationAsync: jest.fn().mockResolvedValue(undefined),
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

// Mock expo-constants
// Constants module provides app metadata that varies by platform
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'testing-rn',
      version: '1.0.0',
    },
    platform: {
      ios: {
        platform: 'ios',
      },
    },
  },
}));

// Mock expo-web-browser
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn().mockResolvedValue(undefined),
  WebBrowserPresentationStyle: {
    AUTOMATIC: 'automatic',
  },
}));

// Mock expo-router Link
jest.mock('expo-router', () => ({
  Link: ({ children, onPress, href, testID, ...props }) => {
    const React = require('react');
    const { Text, TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity 
        testID={testID || "external-link"} 
        onPress={(event) => {
          // Mock event object with preventDefault
          const mockEvent = {
            preventDefault: jest.fn(),
            ...event
          };
          onPress?.(mockEvent);
        }} 
        {...props}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  },
  Href: {},
}));

// Mock react-native-reanimated
// This provides a complete mock for react-native-reanimated to prevent animation-related issues
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // Store original setTimeout to restore later
  
  // Mock setTimeout to prevent open handles
  global.setTimeout = jest.fn((callback, delay) => {
    // Immediately execute callbacks to prevent open handles
    if (typeof callback === 'function') {
      callback();
    }
    return 1; // Return a mock timer ID
  });

  // Mock clearTimeout as well
  global.clearTimeout = jest.fn();

  return {
    ...Reanimated,
    // Ensure all animation functions are properly mocked
    withTiming: jest.fn((value, config, callback) => {
      if (callback) callback();
      return value;
    }),
    withSpring: jest.fn((value, config) => value),
    withSequence: jest.fn((...animations) => animations[animations.length - 1]),
    withRepeat: jest.fn((animation, count) => animation),
    withDelay: jest.fn((delay, animation) => animation),
    runOnJS: jest.fn((fn) => fn),
    runOnUI: jest.fn((fn) => fn),
    useSharedValue: jest.fn((initialValue) => ({ value: initialValue })),
    useAnimatedStyle: jest.fn((styleFactory) => ({})),
    useAnimatedProps: jest.fn((propsFactory) => ({})),
    useDerivedValue: jest.fn((derivedValueFactory) => ({ value: derivedValueFactory() })),
    useAnimatedGestureHandler: jest.fn((handlers) => handlers),
    useAnimatedScrollHandler: jest.fn((handlers) => handlers),
    useAnimatedReaction: jest.fn(),
    useAnimatedRef: jest.fn(() => ({ current: null })),
    useWorkletCallback: jest.fn((callback) => callback),
    interpolate: jest.fn((value, inputRange, outputRange) => outputRange[0]),
    Extrapolation: {
      EXTEND: 'extend',
      CLAMP: 'clamp',
      IDENTITY: 'identity',
    },
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
    },
    createAnimatedComponent: jest.fn((Component) => Component),
  };
});

// Global test timeout
// Increase timeout for tests that involve async operations
jest.setTimeout(10_000);

// Suppress console warnings during tests
// This keeps test output clean and focused on actual test results
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    // Only show warnings that aren't related to mocked modules
    if (
      typeof args[0] === 'string' &&
      !args[0].includes('expo-haptics')
    ) {
      originalWarn.call(console, ...args);
    }
  };
  
  console.error = (...args) => {
    // Only show errors that aren't related to mocked modules
    if (
      typeof args[0] === 'string' &&
      !args[0].includes('expo-haptics')
    ) {
      originalError.call(console, ...args);
    }
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
