/**
 * Counter Utils Test Suite
 * 
 * This file tests the pure utility functions used throughout the counter app.
 * These are unit tests that verify business logic in isolation.
 * 
 * Key Testing Concepts Demonstrated:
 * - Unit testing pure functions
 * - Testing edge cases and boundary conditions
 * - Descriptive test names following "should..." pattern
 * - Arrange-Act-Assert (AAA) structure
 */

import { formatNumber, getCounterAnimationType, getNumberColor } from '@/utils/counter-utils';

describe('Counter Utils', () => {
  /**
   * Tests for the formatNumber function
   * 
   * This function formats numbers with leading zeros and handles negative signs.
   * It's a pure function with no side effects, making it perfect for unit testing.
   */
  describe('formatNumber', () => {
    it('should format positive numbers with leading zeros', () => {
      // Arrange: Set up test data
      const testCases = [
        { input: 5, expected: '0005' },
        { input: 42, expected: '0042' },
        { input: 999, expected: '0999' },
        { input: 1234, expected: '1234' },
      ];

      // Act & Assert: Test each case
      testCases.forEach(({ input, expected }) => {
        expect(formatNumber(input)).toBe(expected);
      });
    });

    it('should format negative numbers with minus sign', () => {
      // Test negative numbers to ensure proper sign handling
      const testCases = [
        { input: -5, expected: '−0005' },
        { input: -42, expected: '−0042' },
        { input: -999, expected: '−0999' },
        { input: -1234, expected: '−1234' },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(formatNumber(input)).toBe(expected);
      });
    });

    it('should handle zero correctly', () => {
      // Zero is a special case that should be formatted as 0000
      expect(formatNumber(0)).toBe('0000');
    });

    it('should handle large numbers', () => {
      // Test edge case with numbers that exceed 4 digits
      expect(formatNumber(12345)).toBe('12345');
      expect(formatNumber(-12345)).toBe('−12345');
    });

    it('should handle single digit numbers', () => {
      // Test the most common case - single digits
      expect(formatNumber(1)).toBe('0001');
      expect(formatNumber(9)).toBe('0009');
      expect(formatNumber(-1)).toBe('−0001');
    });
  });

  /**
   * Tests for the getNumberColor function
   * 
   * This function determines the color of numbers based on their value.
   * It implements business rules for visual feedback in the UI.
   */
  describe('getNumberColor', () => {
    it('should return cyan for normal positive numbers', () => {
      // Test regular positive numbers (not multiples of 10)
      const testCases = [1, 2, 5, 7, 11, 15, 23, 99];
      
      testCases.forEach(number => {
        expect(getNumberColor(number)).toBe('#00fff0');
      });
    });

    it('should return yellow for multiples of 10', () => {
      // Test multiples of 10 (special visual treatment)
      const testCases = [10, 20, 30, 50, 100, 200, 1000];
      
      testCases.forEach(number => {
        expect(getNumberColor(number)).toBe('#ffff00');
      });
    });

    it('should return magenta for negative numbers', () => {
      // All negative numbers should be magenta
      const testCases = [-1, -5, -10, -20, -100, -999];
      
      testCases.forEach(number => {
        expect(getNumberColor(number)).toBe('#ff00ff');
      });
    });

    it('should return cyan for zero', () => {
      // Zero is treated as a normal positive number
      expect(getNumberColor(0)).toBe('#00fff0');
    });

    it('should handle edge cases correctly', () => {
      // Test boundary conditions
      expect(getNumberColor(9)).toBe('#00fff0');  // Just before multiple of 10
      expect(getNumberColor(10)).toBe('#ffff00'); // Exactly multiple of 10
      expect(getNumberColor(11)).toBe('#00fff0'); // Just after multiple of 10
    });
  });

  /**
   * Tests for the getCounterAnimationType function
   * 
   * This function determines what type of animation should play
   * based on the current and previous counter values.
   */
  describe('getCounterAnimationType', () => {
    it('should detect reset animation when going to zero', () => {
      // Reset animation plays when counter goes from any non-zero to zero
      const testCases = [
        { current: 0, previous: 1 },
        { current: 0, previous: 5 },
        { current: 0, previous: -3 },
        { current: 0, previous: 100 },
      ];

      testCases.forEach(({ current, previous }) => {
        const result = getCounterAnimationType(current, previous);
        expect(result.isReset).toBe(true);
        expect(result.isMultipleOfTen).toBe(false);
        expect(result.isRegular).toBe(false);
      });
    });

    it('should detect multiple of 10 animation', () => {
      // Special animation for reaching multiples of 10
      const testCases = [
        { current: 10, previous: 9 },
        { current: 20, previous: 19 },
        { current: 100, previous: 99 },
        { current: -10, previous: -9 }, // Negative multiples of 10
      ];

      testCases.forEach(({ current, previous }) => {
        const result = getCounterAnimationType(current, previous);
        expect(result.isReset).toBe(false);
        expect(result.isMultipleOfTen).toBe(true);
        expect(result.isRegular).toBe(false);
      });
    });

    it('should detect regular animation for normal changes', () => {
      // Regular animation for all other number changes
      const testCases = [
        { current: 5, previous: 4 },
        { current: 3, previous: 2 },
        { current: -2, previous: -1 },
        { current: 15, previous: 14 },
      ];

      testCases.forEach(({ current, previous }) => {
        const result = getCounterAnimationType(current, previous);
        expect(result.isReset).toBe(false);
        expect(result.isMultipleOfTen).toBe(false);
        expect(result.isRegular).toBe(true);
      });
    });

    it('should handle edge cases correctly', () => {
      // Test boundary conditions and special cases
      
      // Going from zero to non-zero should be regular animation
      const result1 = getCounterAnimationType(1, 0);
      expect(result1.isRegular).toBe(true);
      expect(result1.isReset).toBe(false);
      expect(result1.isMultipleOfTen).toBe(false);

      // Going from zero to multiple of 10 should be multiple of 10 animation
      const result2 = getCounterAnimationType(10, 0);
      expect(result2.isMultipleOfTen).toBe(true);
      expect(result2.isReset).toBe(false);
      expect(result2.isRegular).toBe(false);

      // Same value should be regular (no special animation)
      const result3 = getCounterAnimationType(5, 5);
      expect(result3.isRegular).toBe(true);
      expect(result3.isReset).toBe(false);
      expect(result3.isMultipleOfTen).toBe(false);
    });

    it('should handle negative multiples of 10 correctly', () => {
      // Negative multiples of 10 should trigger special animation
      const result = getCounterAnimationType(-20, -19);
      expect(result.isMultipleOfTen).toBe(true);
      expect(result.isReset).toBe(false);
      expect(result.isRegular).toBe(false);
    });
  });
});
