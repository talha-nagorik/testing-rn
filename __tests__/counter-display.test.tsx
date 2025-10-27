/**
 * CounterDisplay Component Test Suite
 * 
 * This file tests the CounterDisplay component, which displays
 * the counter value with animations, colors, and retro styling.
 * 
 * Key Testing Concepts Demonstrated:
 * - Component rendering with render()
 * - Testing props and display values
 * - Testing animated state changes
 * - Testing conditional rendering based on props
 * - Basic accessibility testing
 */

import { render } from '@testing-library/react-native';
import React from 'react';

import CounterDisplay from '@/components/counter-display';

describe('CounterDisplay Component', () => {
  /**
   * Test basic rendering
   * 
   * These tests verify that the component renders correctly
   * and displays the expected content based on props.
   */
  describe('Rendering', () => {
    it('should render with zero value', () => {
      // Arrange & Act: Render with zero value
      const { getAllByText } = render(
        <CounterDisplay value={0} isAnimating={false} />
      );

      // Assert: Should display "0000"
      expect(getAllByText('0000')[0]).toBeTruthy();
    });

    it('should render with positive value', () => {
      // Arrange & Act: Render with positive value
      const { getAllByText } = render(
        <CounterDisplay value={42} isAnimating={false} />
      );

      // Assert: Should display formatted number
      expect(getAllByText('0042')[0]).toBeTruthy();
    });

    it('should render with large value', () => {
      // Arrange & Act: Render with large value
      const { getAllByText } = render(
        <CounterDisplay value={12345} isAnimating={false} />
      );

      // Assert: Should display "12345"
      expect(getAllByText('12345')).toBeTruthy();
    });

    it('should render without crashing', () => {
      // Arrange & Act: Render the component
      const { getAllByText } = render(
        <CounterDisplay value={0} isAnimating={false} />
      );

      // Assert: Component should render without errors
      expect(getAllByText('0000', { exact: false })).toBeTruthy();
    });
  });

  /**
   * Test value formatting
   * 
   * These tests verify that the component correctly
   * formats and displays different number values.
   */
  describe('Value Formatting', () => {
    it('should format single digit numbers', () => {
      // Arrange: Test single digit numbers
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      numbers.forEach((num) => {
        // Act: Render with each number
        const { getAllByText } = render(
          <CounterDisplay value={num} isAnimating={false} />
        );

        // Assert: Each number should be formatted with leading zeros
        const formattedNumber = num.toString().padStart(4, '0');
        expect(getAllByText(formattedNumber)).toBeTruthy();
      });
    });

    it('should format double digit numbers', () => {
      // Arrange & Act: Test double digit numbers
      const { getAllByText } = render(
        <CounterDisplay value={42} isAnimating={false} />
      );

      // Assert: Should format with leading zeros
      expect(getAllByText('0042')[0]).toBeTruthy();
    });

    it('should format triple digit numbers', () => {
      // Arrange & Act: Test triple digit numbers
      const { getAllByText } = render(
        <CounterDisplay value={999} isAnimating={false} />
      );

      // Assert: Should format with leading zero
      expect(getAllByText('0999')).toBeTruthy();
    });

    it('should format four digit numbers', () => {
      // Arrange & Act: Test four digit numbers
      const { getAllByText } = render(
        <CounterDisplay value={2024} isAnimating={false} />
      );

      // Assert: Should display all digits
      expect(getAllByText('2024')).toBeTruthy();
    });

    it('should format large numbers', () => {
      // Arrange & Act: Test large numbers
      const largeNumbers = [12345, 99999, 123456];

      largeNumbers.forEach((num) => {
        const { getAllByText } = render(
          <CounterDisplay value={num} isAnimating={false} />
        );

        // Assert: Should display the number
        expect(getAllByText(num.toString())).toBeTruthy();
      });
    });

    it('should format multiples of ten', () => {
      // Arrange: Test multiples of ten
      const multiplesOfTen = [10, 20, 30, 40, 50, 100, 500, 1000];

      multiplesOfTen.forEach((num) => {
        // Act: Render with each multiple
        const { getAllByText } = render(
          <CounterDisplay value={num} isAnimating={false} />
        );

        // Assert: Should display correctly
        const formattedNumber = num.toString().padStart(4, '0');
        expect(getAllByText(formattedNumber)).toBeTruthy();
      });
    });
  });

  /**
   * Test animation state
   * 
   * These tests verify that the component handles
   * the animation state prop correctly.
   */
  describe('Animation State', () => {
    it('should render when not animating', () => {
      // Arrange & Act: Render with isAnimating false
      const { getAllByText } = render(
        <CounterDisplay value={5} isAnimating={false} />
      );

      // Assert: Should render without errors
      expect(getAllByText('0005')).toBeTruthy();
    });

    it('should render when animating', () => {
      // Arrange & Act: Render with isAnimating true
      const { getAllByText } = render(
        <CounterDisplay value={10} isAnimating={true} />
      );

      // Assert: Should render without errors
      expect(getAllByText('0010')).toBeTruthy();
    });

    it('should handle animation state changes', () => {
      // Arrange: Render with initial state
      const { getAllByText, rerender } = render(
        <CounterDisplay value={5} isAnimating={false} />
      );

      // Assert: Initial state
      expect(getAllByText('0005')).toBeTruthy();

      // Act: Change animation state
      rerender(<CounterDisplay value={5} isAnimating={true} />);

      // Assert: Should still render correctly
      expect(getAllByText('0005')).toBeTruthy();

      // Act: Change back
      rerender(<CounterDisplay value={5} isAnimating={false} />);

      // Assert: Should still render correctly
      expect(getAllByText('0005')).toBeTruthy();
    });
  });

  /**
   * Test value updates
   * 
   * These tests verify that the component correctly
   * updates when the value prop changes.
   */
  describe('Value Updates', () => {
    it('should update display when value changes', () => {
      // Arrange: Render with initial value
      const { getAllByText, rerender } = render(
        <CounterDisplay value={0} isAnimating={false} />
      );

      // Assert: Initial value
      expect(getAllByText('0000', { exact: false })).toBeTruthy();

      // Act: Change value to 5
      rerender(<CounterDisplay value={5} isAnimating={false} />);

      // Assert: Should display new value
      expect(getAllByText('0005')).toBeTruthy();

      // Act: Change value to 42
      rerender(<CounterDisplay value={42} isAnimating={false} />);

      // Assert: Should display new value
      expect(getAllByText('0042')[0]).toBeTruthy();
    });

    it('should handle rapid value changes', () => {
      // Arrange: Render with initial value
      const { getAllByText, rerender } = render(
        <CounterDisplay value={0} isAnimating={false} />
      );

      // Act: Rapidly change values
      for (let i = 1; i <= 10; i++) {
        rerender(<CounterDisplay value={i} isAnimating={false} />);
        const formattedNumber = i.toString().padStart(4, '0');
        expect(getAllByText(formattedNumber)).toBeTruthy();
      }

      // Assert: Should handle all changes
      expect(getAllByText('0010')).toBeTruthy();
    });

    it('should handle reset from high value to zero', () => {
      // Arrange: Render with high value
      const { getAllByText, rerender } = render(
        <CounterDisplay value={999} isAnimating={false} />
      );

      // Assert: Initial value
      expect(getAllByText('0999')).toBeTruthy();

      // Act: Reset to zero
      rerender(<CounterDisplay value={0} isAnimating={false} />);

      // Assert: Should display zero
      expect(getAllByText('0000', { exact: false })).toBeTruthy();
    });
  });

  /**
   * Test accessibility
   * 
   * These tests verify that the component is accessible
   * to users with assistive technologies.
   */
  describe('Accessibility', () => {
    it('should be accessible by text content', () => {
      // Arrange & Act: Render the component
      const { getAllByText } = render(
        <CounterDisplay value={42} isAnimating={false} />
      );

      // Assert: Should be findable by text content
      expect(getAllByText('0042')[0]).toBeTruthy();
    });

    it('should render numbers that can be read by screen readers', () => {
      // Arrange & Act: Render the component
      const { getAllByText } = render(
        <CounterDisplay value={100} isAnimating={false} />
      );

      // Assert: Text should be accessible
      const numberElement = getAllByText('0100')[0];
      expect(numberElement).toBeTruthy();
    });
  });

  /**
   * Test edge cases and error handling
   * 
   * These tests verify that the component handles edge cases
   * gracefully and doesn't break with unexpected conditions.
   */
  describe('Edge Cases', () => {
    it('should handle maximum value', () => {
      // Arrange & Act: Render with maximum value
      const { getAllByText } = render(
        <CounterDisplay value={999999} isAnimating={false} />
      );

      // Assert: Should render without issues
      expect(getAllByText('999999')).toBeTruthy();
    });

    it('should handle very large numbers', () => {
      // Arrange: Test very large numbers
      const largeNumbers = [9999, 12345, 99999];

      largeNumbers.forEach((num) => {
        // Act: Render with each large number
        const { getAllByText } = render(
          <CounterDisplay value={num} isAnimating={false} />
        );

        // Assert: Should render correctly
        expect(getAllByText(num.toString())).toBeTruthy();
      });
    });

    it('should render consistently across multiple renders', () => {
      // Arrange & Act: Render the component multiple times
      const { getAllByText, rerender } = render(
        <CounterDisplay value={0} isAnimating={false} />
      );

      // Assert: First render
      expect(getAllByText('0000', { exact: false })).toBeTruthy();

      // Act: Rerender
      rerender(<CounterDisplay value={0} isAnimating={false} />);

      // Assert: Should still render correctly
      expect(getAllByText('0000', { exact: false })).toBeTruthy();
    });
  });
});
