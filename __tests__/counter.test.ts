import { act, renderHook } from '@testing-library/react-native';

import { useCounter } from '@/hooks/use-counter';
import { formatNumber, getCounterAnimationType, getNumberColor } from '@/utils/counter-utils';

// Mock Haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('Counter Logic Tests', () => {
  describe('useCounter hook', () => {
    it('should initialize with count 0', () => {
      const { result } = renderHook(() => useCounter());
      expect(result.current.count).toBe(0);
      expect(result.current.isAnimating).toBe(false);
    });

    it('should increment count', () => {
      const { result } = renderHook(() => useCounter());
      
      act(() => {
        result.current.increment();
      });
      
      expect(result.current.count).toBe(1);
    });

    it('should decrement count', () => {
      const { result } = renderHook(() => useCounter());
      
      act(() => {
        result.current.decrement();
      });
      
      expect(result.current.count).toBe(-1);
    });

    it('should reset count to 0', () => {
      const { result } = renderHook(() => useCounter());
      
      act(() => {
        result.current.increment();
        result.current.increment();
        result.current.reset();
      });
      
      expect(result.current.count).toBe(0);
    });

    it('should handle multiple operations', () => {
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
        result.current.decrement();
      });
      expect(result.current.count).toBe(1);
      
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(2);
    });
  });

  describe('Counter Utils', () => {
    describe('formatNumber', () => {
      it('should format positive numbers with leading zeros', () => {
        expect(formatNumber(5)).toBe('0005');
        expect(formatNumber(42)).toBe('0042');
        expect(formatNumber(999)).toBe('0999');
      });

      it('should format negative numbers with minus sign', () => {
        expect(formatNumber(-5)).toBe('−0005');
        expect(formatNumber(-42)).toBe('−0042');
      });

      it('should handle zero', () => {
        expect(formatNumber(0)).toBe('0000');
      });
    });

    describe('getNumberColor', () => {
      it('should return cyan for normal positive numbers', () => {
        expect(getNumberColor(1)).toBe('#00fff0');
        expect(getNumberColor(5)).toBe('#00fff0');
        expect(getNumberColor(99)).toBe('#00fff0');
      });

      it('should return yellow for multiples of 10', () => {
        expect(getNumberColor(10)).toBe('#ffff00');
        expect(getNumberColor(20)).toBe('#ffff00');
        expect(getNumberColor(100)).toBe('#ffff00');
      });

      it('should return magenta for negative numbers', () => {
        expect(getNumberColor(-1)).toBe('#ff00ff');
        expect(getNumberColor(-10)).toBe('#ff00ff');
        expect(getNumberColor(-100)).toBe('#ff00ff');
      });

      it('should return cyan for zero', () => {
        expect(getNumberColor(0)).toBe('#00fff0');
      });
    });

    describe('getCounterAnimationType', () => {
      it('should detect reset animation', () => {
        const result = getCounterAnimationType(0, 5);
        expect(result.isReset).toBe(true);
        expect(result.isMultipleOfTen).toBe(false);
        expect(result.isRegular).toBe(false);
      });

      it('should detect multiple of 10 animation', () => {
        const result = getCounterAnimationType(20, 19);
        expect(result.isReset).toBe(false);
        expect(result.isMultipleOfTen).toBe(true);
        expect(result.isRegular).toBe(false);
      });

      it('should detect regular animation', () => {
        const result = getCounterAnimationType(5, 4);
        expect(result.isReset).toBe(false);
        expect(result.isMultipleOfTen).toBe(false);
        expect(result.isRegular).toBe(true);
      });
    });
  });
});
