/**
 * CounterControls Component Test Suite
 * 
 * This file tests the CounterControls component, which renders
 * the increment, decrement, and reset buttons for the counter.
 * 
 * Key Testing Concepts Demonstrated:
 * - Component rendering with render()
 * - Testing user interactions with fireEvent
 * - Testing callback props
 * - Testing component structure and layout
 * - Basic accessibility testing
 */

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import CounterControls from '@/components/counter-controls';

describe('CounterControls Component', () => {
  /**
   * Test basic rendering
   * 
   * These tests verify that the component renders correctly
   * and displays all the expected buttons.
   */
  describe('Rendering', () => {
    it('should render all three buttons', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render the component
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      // Assert: All buttons should be present
      expect(getByText('+')).toBeTruthy();
      expect(getByText('−')).toBeTruthy();
      expect(getByText('RESET')).toBeTruthy();
    });

    it('should render without crashing', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render the component
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      // Assert: Component should render without errors
      expect(getByText('+')).toBeTruthy();
    });
  });

  /**
   * Test user interactions
   * 
   * These tests verify that button presses trigger
   * the correct callback functions.
   */
  describe('User Interactions', () => {
    it('should call onIncrement when + button is pressed', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render and press the increment button
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      fireEvent.press(getByText('+'));

      // Assert: onIncrement should have been called
      expect(mockOnIncrement).toHaveBeenCalledTimes(1);
      expect(mockOnDecrement).not.toHaveBeenCalled();
      expect(mockOnReset).not.toHaveBeenCalled();
    });

    it('should call onDecrement when − button is pressed', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render and press the decrement button
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      fireEvent.press(getByText('−'));

      // Assert: onDecrement should have been called
      expect(mockOnDecrement).toHaveBeenCalledTimes(1);
      expect(mockOnIncrement).not.toHaveBeenCalled();
      expect(mockOnReset).not.toHaveBeenCalled();
    });

    it('should call onReset when RESET button is pressed', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render and press the reset button
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      fireEvent.press(getByText('RESET'));

      // Assert: onReset should have been called
      expect(mockOnReset).toHaveBeenCalledTimes(1);
      expect(mockOnIncrement).not.toHaveBeenCalled();
      expect(mockOnDecrement).not.toHaveBeenCalled();
    });

    it('should handle multiple button presses', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render and press multiple buttons
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('−'));
      fireEvent.press(getByText('RESET'));

      // Assert: All callbacks should have been called correctly
      expect(mockOnIncrement).toHaveBeenCalledTimes(2);
      expect(mockOnDecrement).toHaveBeenCalledTimes(1);
      expect(mockOnReset).toHaveBeenCalledTimes(1);
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
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render the component
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      // Assert: All buttons should be findable by text
      expect(getByText('+')).toBeTruthy();
      expect(getByText('−')).toBeTruthy();
      expect(getByText('RESET')).toBeTruthy();
    });

    it('should render buttons that can be pressed', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render the component
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      // Assert: All buttons should be pressable
      const incrementButton = getByText('+');
      const decrementButton = getByText('−');
      const resetButton = getByText('RESET');

      expect(incrementButton).toBeTruthy();
      expect(decrementButton).toBeTruthy();
      expect(resetButton).toBeTruthy();
    });
  });

  /**
   * Test edge cases and error handling
   * 
   * These tests verify that the component handles edge cases
   * gracefully and doesn't break with unexpected conditions.
   */
  describe('Edge Cases', () => {
    it('should handle rapid button presses', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render and rapidly press buttons
      const { getByText } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      const incrementButton = getByText('+');
      
      // Rapidly press increment button
      for (let i = 0; i < 10; i++) {
        fireEvent.press(incrementButton);
      }

      // Assert: All presses should be handled
      expect(mockOnIncrement).toHaveBeenCalledTimes(10);
    });

    it('should render consistently across multiple renders', () => {
      // Arrange: Create mock functions
      const mockOnIncrement = jest.fn();
      const mockOnDecrement = jest.fn();
      const mockOnReset = jest.fn();

      // Act: Render multiple times
      const { getByText, rerender } = render(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      // Assert: First render
      expect(getByText('+')).toBeTruthy();

      // Act: Rerender
      rerender(
        <CounterControls
          onIncrement={mockOnIncrement}
          onDecrement={mockOnDecrement}
          onReset={mockOnReset}
        />
      );

      // Assert: Should still render correctly
      expect(getByText('+')).toBeTruthy();
    });
  });

  /**
   * Test component integration
   * 
   * These tests verify that the component works correctly
   * with different prop combinations and scenarios.
   */
  describe('Component Integration', () => {
    it('should work with different callback implementations', () => {
      // Arrange: Create different callback implementations
      let incrementCount = 0;
      let decrementCount = 0;
      let resetCount = 0;

      const incrementCallback = () => { incrementCount++; };
      const decrementCallback = () => { decrementCount++; };
      const resetCallback = () => { resetCount++; };

      // Act: Render and interact
      const { getByText } = render(
        <CounterControls
          onIncrement={incrementCallback}
          onDecrement={decrementCallback}
          onReset={resetCallback}
        />
      );

      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('−'));
      fireEvent.press(getByText('RESET'));

      // Assert: Callbacks should have been executed
      expect(incrementCount).toBe(1);
      expect(decrementCount).toBe(1);
      expect(resetCount).toBe(1);
    });

    it('should handle empty callback functions', () => {
      // Arrange: Create empty callback functions
      const emptyCallback = () => {};

      // Act: Render and interact
      const { getByText } = render(
        <CounterControls
          onIncrement={emptyCallback}
          onDecrement={emptyCallback}
          onReset={emptyCallback}
        />
      );

      // Assert: Should render without errors
      expect(getByText('+')).toBeTruthy();
      expect(getByText('−')).toBeTruthy();
      expect(getByText('RESET')).toBeTruthy();

      // Act: Press buttons
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('−'));
      fireEvent.press(getByText('RESET'));

      // Assert: Should not crash
      expect(getByText('+')).toBeTruthy();
    });
  });
});
