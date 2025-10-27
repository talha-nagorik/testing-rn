/**
 * useCounter Hook Test Suite
 * 
 * This file tests the custom useCounter hook that manages counter state and animations.
 * Hook testing requires special tools like renderHook and act to handle React's
 * state updates and effects properly.
 * 
 * Key Testing Concepts Demonstrated:
 * - Testing custom React hooks with renderHook
 * - Using act() for state updates
 * - Mocking external dependencies (expo-haptics)
 * - Testing async behavior and side effects
 * - Verifying hook return values and state changes
 */

import { act, renderHook } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';

import { useCounter } from '@/hooks/use-counter';

// Mock expo-haptics to verify haptic feedback calls
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn().mockResolvedValue(undefined),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('useCounter Hook', () => {
  // Clear all mocks before each test to ensure clean state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test hook initialization
   * 
   * When a hook is first rendered, it should return the expected initial state.
   * This tests the default values and initial setup.
   */
  describe('Initialization', () => {
    it('should initialize with count 0 and not animating', () => {
      // Arrange & Act: Render the hook
      const { result } = renderHook(() => useCounter());

      // Assert: Check initial state
      expect(result.current.count).toBe(0);
      expect(result.current.isAnimating).toBe(false);
      
      // Verify all expected properties are present
      expect(result.current.increment).toBeInstanceOf(Function);
      expect(result.current.decrement).toBeInstanceOf(Function);
      expect(result.current.reset).toBeInstanceOf(Function);
      expect(result.current.rollAnimation).toBeDefined();
      expect(result.current.glowOpacity).toBeDefined();
      expect(result.current.flashAnimation).toBeDefined();
    });
  });

  /**
   * Test increment functionality
   * 
   * The increment function should increase the count by 1 and trigger
   * haptic feedback. We use act() to wrap state updates.
   */
  describe('Increment', () => {
    it('should increment count by 1', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Call increment function wrapped in act()
      act(() => {
        result.current.increment();
      });

      // Assert: Count should increase by 1
      expect(result.current.count).toBe(1);
    });

    it('should trigger haptic feedback on increment', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Call increment
      act(() => {
        result.current.increment();
      });

      // Assert: Haptic feedback should be called with Medium impact
      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple increments', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Call increment multiple times
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(1);

      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(2);

      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(3);

      // Assert: Each increment should trigger haptic feedback
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(3);
    });
  });

  /**
   * Test decrement functionality
   * 
   * Similar to increment, but decreases the count by 1.
   */
  describe('Decrement', () => {
    it('should decrement count by 1', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Call decrement function
      act(() => {
        result.current.decrement();
      });

      // Assert: Count should decrease by 1 (become -1)
      expect(result.current.count).toBe(-1);
    });

    it('should trigger haptic feedback on decrement', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Call decrement
      act(() => {
        result.current.decrement();
      });

      // Assert: Haptic feedback should be called
      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
    });

    it('should handle negative counts', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Decrement multiple times to get negative values
      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toBe(-1);

      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toBe(-2);

      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toBe(-3);
    });
  });

  /**
   * Test reset functionality
   * 
   * Reset should always set the count back to 0, regardless of current value.
   * It uses Heavy haptic feedback to indicate a significant action.
   */
  describe('Reset', () => {
    it('should reset count to 0 from positive value', () => {
      // Arrange: Render hook and increment to a positive value
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(1);

      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(2);

      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(3);

      // Act: Reset the counter
      act(() => {
        result.current.reset();
      });

      // Assert: Count should be 0
      expect(result.current.count).toBe(0);
    });

    it('should reset count to 0 from negative value', () => {
      // Arrange: Render hook and decrement to a negative value
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toBe(-1);

      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toBe(-2);

      // Act: Reset the counter
      act(() => {
        result.current.reset();
      });

      // Assert: Count should be 0
      expect(result.current.count).toBe(0);
    });

    it('should trigger heavy haptic feedback on reset', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Reset the counter
      act(() => {
        result.current.reset();
      });

      // Assert: Heavy haptic feedback should be called
      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
    });

    it('should reset from zero without issues', () => {
      // Arrange: Render the hook (already at 0)
      const { result } = renderHook(() => useCounter());

      // Act: Reset when already at 0
      act(() => {
        result.current.reset();
      });

      // Assert: Should still be 0
      expect(result.current.count).toBe(0);
    });
  });

  /**
   * Test complex state transitions
   * 
   * These tests verify that the hook handles complex sequences of operations
   * correctly, simulating real user interactions.
   */
  describe('Complex State Transitions', () => {
    it('should handle mixed increment and decrement operations', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Perform a sequence of operations
      act(() => {
        result.current.increment(); // 1
      });
      expect(result.current.count).toBe(1);

      act(() => {
        result.current.increment(); // 2
      });
      expect(result.current.count).toBe(2);

      act(() => {
        result.current.decrement(); // 1
      });
      expect(result.current.count).toBe(1);

      act(() => {
        result.current.increment(); // 2
      });
      expect(result.current.count).toBe(2);

      act(() => {
        result.current.decrement(); // 1
      });
      expect(result.current.count).toBe(1);

      // Assert: Final state should be correct
      expect(result.current.count).toBe(1);
      
      // Verify all operations triggered haptic feedback
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(5);
    });

    it('should handle reset in the middle of operations', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Perform operations with reset in the middle
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(1);

      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(2);

      act(() => {
        result.current.reset();
      });
      expect(result.current.count).toBe(0);

      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toBe(-1);

      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toBe(-2);

      // Assert: Final state should be correct
      expect(result.current.count).toBe(-2);
      
      // Verify haptic feedback calls (2 increments + 1 reset + 2 decrements)
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(5);
    });

    it('should maintain state consistency across multiple operations', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Perform many operations
      const operations = [
        () => result.current.increment(),
        () => result.current.increment(),
        () => result.current.decrement(),
        () => result.current.increment(),
        () => result.current.reset(),
        () => result.current.decrement(),
        () => result.current.increment(),
      ];

      let expectedCount = 0;
      operations.forEach((operation, index) => {
        act(() => {
          operation();
        });

        // Update expected count based on operation
        if (index < 4) {
          if (index === 0 || index === 1 || index === 3) expectedCount++;
          if (index === 2) expectedCount--;
        } else if (index === 4) {
          expectedCount = 0; // reset
        } else if (index === 5) {
          expectedCount--;
        } else if (index === 6) {
          expectedCount++;
        }

        expect(result.current.count).toBe(expectedCount);
      });

      // Assert: Final count should be correct
      expect(result.current.count).toBe(0);
    });
  });

  /**
   * Test animation state
   * 
   * The hook tracks animation state, though the actual animation logic
   * is handled by react-native-reanimated (which we mock).
   */
  describe('Animation State', () => {
    it('should return animation objects', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Assert: Animation objects should be present
      expect(result.current.rollAnimation).toBeDefined();
      expect(result.current.glowOpacity).toBeDefined();
      expect(result.current.flashAnimation).toBeDefined();
    });

    it('should maintain animation state consistency', () => {
      // Arrange: Render the hook
      const { result } = renderHook(() => useCounter());

      // Act: Perform operations
      act(() => {
        result.current.increment();
      });

      // Assert: Animation objects should still be defined
      expect(result.current.rollAnimation).toBeDefined();
      expect(result.current.glowOpacity).toBeDefined();
      expect(result.current.flashAnimation).toBeDefined();
    });
  });
});
