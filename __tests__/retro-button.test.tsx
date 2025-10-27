/**
 * RetroButton Component Test Suite
 * 
 * This file tests the RetroButton component, which is a custom
 * button with retro styling, animations, and particle effects.
 * 
 * Key Testing Concepts Demonstrated:
 * - Component rendering with render()
 * - Testing user interactions with fireEvent
 * - Testing props and styling
 * - Testing component state and animations
 * - Basic accessibility testing
 */

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import RetroButton from '@/components/retro-button';

describe('RetroButton Component', () => {
  /**
   * Test basic rendering
   * 
   * These tests verify that the component renders correctly
   * and displays the expected content.
   */
  describe('Rendering', () => {
    it('should render with correct label', () => {
      // Arrange & Act: Render the button
      const { getByText } = render(
        <RetroButton label="Test Button" onPress={() => {}} />
      );

      // Assert: Button should display the label
      expect(getByText('Test Button')).toBeTruthy();
    });

    it('should render with different labels', () => {
      // Arrange & Act: Test different labels
      const labels = ['+', '−', 'RESET', 'Custom Label', '123'];

      labels.forEach((label) => {
        const { getByText } = render(
          <RetroButton label={label} onPress={() => {}} />
        );

        // Assert: Each label should render correctly
        expect(getByText(label)).toBeTruthy();
      });
    });

    it('should render without crashing', () => {
      // Arrange & Act: Render the button
      const { getByText } = render(
        <RetroButton label="No Crash" onPress={() => {}} />
      );

      // Assert: Component should render without errors
      expect(getByText('No Crash')).toBeTruthy();
    });
  });

  /**
   * Test user interactions
   * 
   * These tests verify that button presses trigger
   * the correct callback functions.
   */
  describe('User Interactions', () => {
    it('should call onPress when button is pressed', () => {
      // Arrange: Create a mock function
      const mockOnPress = jest.fn();

      // Act: Render and press the button
      const { getByText } = render(
        <RetroButton label="Press Me" onPress={mockOnPress} />
      );

      fireEvent.press(getByText('Press Me'));

      // Assert: onPress should have been called
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple presses', () => {
      // Arrange: Create a mock function
      const mockOnPress = jest.fn();

      // Act: Render and press multiple times
      const { getByText } = render(
        <RetroButton label="Multi Press" onPress={mockOnPress} />
      );

      fireEvent.press(getByText('Multi Press'));
      fireEvent.press(getByText('Multi Press'));
      fireEvent.press(getByText('Multi Press'));

      // Assert: onPress should have been called for each press
      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });

    it('should handle rapid presses', () => {
      // Arrange: Create a mock function
      const mockOnPress = jest.fn();

      // Act: Render and rapidly press
      const { getByText } = render(
        <RetroButton label="Rapid Press" onPress={mockOnPress} />
      );

      const button = getByText('Rapid Press');
      
      // Rapidly press 10 times
      for (let i = 0; i < 10; i++) {
        fireEvent.press(button);
      }

      // Assert: All presses should be handled
      expect(mockOnPress).toHaveBeenCalledTimes(10);
    });
  });

  /**
   * Test color props
   * 
   * These tests verify that the component correctly
   * applies different color themes.
   */
  describe('Color Props', () => {
    it('should render with default cyan color', () => {
      // Arrange & Act: Render with default color
      const { getByText } = render(
        <RetroButton label="Cyan Button" onPress={() => {}} />
      );

      // Assert: Button should render (color is applied through styling)
      expect(getByText('Cyan Button')).toBeTruthy();
    });

    it('should render with magenta color', () => {
      // Arrange & Act: Render with magenta color
      const { getByText } = render(
        <RetroButton label="Magenta Button" onPress={() => {}} color="magenta" />
      );

      // Assert: Button should render
      expect(getByText('Magenta Button')).toBeTruthy();
    });

    it('should render with yellow color', () => {
      // Arrange & Act: Render with yellow color
      const { getByText } = render(
        <RetroButton label="Yellow Button" onPress={() => {}} color="yellow" />
      );

      // Assert: Button should render
      expect(getByText('Yellow Button')).toBeTruthy();
    });

    it('should render with green color', () => {
      // Arrange & Act: Render with green color
      const { getByText } = render(
        <RetroButton label="Green Button" onPress={() => {}} color="green" />
      );

      // Assert: Button should render
      expect(getByText('Green Button')).toBeTruthy();
    });

    it('should handle all color variants', () => {
      // Arrange: Test all available colors
      const colors = ['cyan', 'magenta', 'yellow', 'green'] as const;

      colors.forEach((color) => {
        // Act: Render with each color
        const { getByText } = render(
          <RetroButton label={`${color} Button`} onPress={() => {}} color={color} />
        );

        // Assert: Each color should render correctly
        expect(getByText(`${color} Button`)).toBeTruthy();
      });
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
      // Arrange & Act: Render the button
      const { getByText } = render(
        <RetroButton label="Accessible Button" onPress={() => {}} />
      );

      // Assert: Should be findable by text content
      expect(getByText('Accessible Button')).toBeTruthy();
    });

    it('should render text that can be read by screen readers', () => {
      // Arrange & Act: Render the button
      const { getByText } = render(
        <RetroButton label="Screen Reader Text" onPress={() => {}} />
      );

      // Assert: Text should be accessible
      const buttonElement = getByText('Screen Reader Text');
      expect(buttonElement).toBeTruthy();
    });

    it('should be pressable by users', () => {
      // Arrange: Create a mock function
      const mockOnPress = jest.fn();

      // Act: Render and press the button
      const { getByText } = render(
        <RetroButton label="Pressable Button" onPress={mockOnPress} />
      );

      fireEvent.press(getByText('Pressable Button'));

      // Assert: Button should be pressable
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Test edge cases and error handling
   * 
   * These tests verify that the component handles edge cases
   * gracefully and doesn't break with unexpected conditions.
   */
  describe('Edge Cases', () => {
    it('should handle empty label', () => {
      // Arrange & Act: Render with empty label
      const { root } = render(
        <RetroButton label="" onPress={() => {}} />
      );

      // Assert: Should render without crashing
      expect(root).toBeTruthy();
    });

    it('should handle very long labels', () => {
      // Arrange: Create a very long label
      const longLabel = 'A'.repeat(100);

      // Act: Render with long label
      const { getByText } = render(
        <RetroButton label={longLabel} onPress={() => {}} />
      );

      // Assert: Should render without issues
      expect(getByText(longLabel)).toBeTruthy();
    });

    it('should handle special characters in labels', () => {
      // Arrange: Test labels with special characters
      const specialLabels = [
        '!@#$%^&*()',
        'Button with spaces',
        'Button-with-dashes',
        'Button_with_underscores',
        'Button.with.dots',
      ];

      specialLabels.forEach((label) => {
        // Act: Render with each special label
        const { getByText } = render(
          <RetroButton label={label} onPress={() => {}} />
        );

        // Assert: Each label should render correctly
        expect(getByText(label)).toBeTruthy();
      });
    });

    it('should render consistently across multiple renders', () => {
      // Arrange & Act: Render the button multiple times
      const { getByText, rerender } = render(
        <RetroButton label="Consistent Button" onPress={() => {}} />
      );

      // Assert: First render
      expect(getByText('Consistent Button')).toBeTruthy();

      // Act: Rerender
      rerender(<RetroButton label="Consistent Button" onPress={() => {}} />);

      // Assert: Should still render correctly
      expect(getByText('Consistent Button')).toBeTruthy();
    });
  });

  /**
   * Test component integration
   * 
   * These tests verify that the component works correctly
   * with different prop combinations and scenarios.
   */
  describe('Component Integration', () => {
    it('should work with different onPress implementations', () => {
      // Arrange: Test different callback implementations
      let pressCount = 0;
      const incrementCallback = () => { pressCount++; };
      const logCallback = () => { /* Test callback execution */ };

      // Act: Test increment callback
      const { getByText, rerender } = render(
        <RetroButton label="Increment" onPress={incrementCallback} />
      );

      fireEvent.press(getByText('Increment'));

      // Assert: Callback should have been executed
      expect(pressCount).toBe(1);

      // Act: Test log callback
      rerender(<RetroButton label="Log" onPress={logCallback} />);
      fireEvent.press(getByText('Log'));

      // Assert: Should not crash
      expect(getByText('Log')).toBeTruthy();
    });

    it('should handle disabled state', () => {
      // Arrange: Create a mock function
      const mockOnPress = jest.fn();

      // Act: Render with disabled prop
      const { getByText } = render(
        <RetroButton label="Disabled Button" onPress={mockOnPress} disabled />
      );

      // Assert: Button should render
      expect(getByText('Disabled Button')).toBeTruthy();

      // Act: Try to press disabled button
      fireEvent.press(getByText('Disabled Button'));

      // Assert: onPress should not have been called
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should work with custom styles', () => {
      // Arrange: Create custom style
      const customStyle = { marginTop: 20 };

      // Act: Render with custom style
      const { getByText } = render(
        <RetroButton 
          label="Styled Button" 
          onPress={() => {}} 
          style={customStyle}
        />
      );

      // Assert: Button should render with custom style
      expect(getByText('Styled Button')).toBeTruthy();
    });
  });
});
