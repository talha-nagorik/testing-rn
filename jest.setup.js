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
