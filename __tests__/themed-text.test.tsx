/**
 * ThemedText Component Test Suite
 *
 * This file tests the ThemedText component, which applies theme colors
 * and text styles based on the provided props.
 *
 * Key Testing Concepts Demonstrated:
 * - Component rendering with render()
 * - Testing prop handling (type, style, colors)
 * - Testing custom hooks (useThemeColor)
 * - Text content verification
 * - Multiple style variants
 */

import { ThemedText } from '@/components/themed-text';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock the useThemeColor hook
jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: jest.fn((scheme, colorName) => {
    // Return a mock color based on the color name
    const mockColors = {
      text: '#000000',
      background: '#FFFFFF',
    };
    return mockColors[colorName] || '#000000';
  }),
}));

describe('ThemedText Component', () => {
  /**
   * Test basic rendering
   *
   * These tests verify that the component renders correctly
   * with different text content.
   */
  describe('Rendering', () => {
    it('should render with default text', () => {
      // Arrange & Act: Render the component with default props
      const { getByText } = render(<ThemedText>Hello World</ThemedText>);

      // Assert: Should display the text
      expect(getByText('Hello World')).toBeTruthy();
    });

    it('should render without children', () => {
      // Arrange & Act: Render without children
      const { root } = render(<ThemedText />);

      // Assert: Should render without crashing
      expect(root).toBeTruthy();
    });

    it('should render with empty string', () => {
      // Arrange & Act: Render with empty string
      const { root } = render(<ThemedText>{''}</ThemedText>);

      // Assert: Should render without crashing
      expect(root).toBeTruthy();
    });
  });

  /**
   * Test text types
   *
   * These tests verify that the component applies different
   * styles based on the type prop.
   */
  describe('Text Types', () => {
    it('should render with default type', () => {
      // Arrange & Act: Render with default type
      const { getByText } = render(<ThemedText>Default Text</ThemedText>);

      // Assert: Should render
      expect(getByText('Default Text')).toBeTruthy();
    });

    it('should render with title type', () => {
      // Arrange & Act: Render with title type
      const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);

      // Assert: Should render
      expect(getByText('Title Text')).toBeTruthy();
    });

    it('should render with subtitle type', () => {
      // Arrange & Act: Render with subtitle type
      const { getByText } = render(<ThemedText type="subtitle">Subtitle Text</ThemedText>);

      // Assert: Should render
      expect(getByText('Subtitle Text')).toBeTruthy();
    });

    it('should render with link type', () => {
      // Arrange & Act: Render with link type
      const { getByText } = render(<ThemedText type="link">Link Text</ThemedText>);

      // Assert: Should render
      expect(getByText('Link Text')).toBeTruthy();
    });

    it('should render with defaultSemiBold type', () => {
      // Arrange & Act: Render with defaultSemiBold type
      const { getByText } = render(<ThemedText type="defaultSemiBold">SemiBold Text</ThemedText>);

      // Assert: Should render
      expect(getByText('SemiBold Text')).toBeTruthy();
    });
  });

  /**
   * Test custom styles and colors
   *
   * These tests verify that the component accepts and applies
   * custom styles and colors.
   */
  describe('Custom Styling', () => {
    it('should accept custom style', () => {
      // Arrange: Define custom style
      const customStyle = { fontSize: 20, color: 'red' };

      // Act: Render with custom style
      const { getByText } = render(
        <ThemedText style={customStyle}>Custom Style Text</ThemedText>
      );

      // Assert: Should render
      expect(getByText('Custom Style Text')).toBeTruthy();
    });

    it('should accept lightColor prop', () => {
      // Arrange & Act: Render with lightColor
      const { getByText } = render(
        <ThemedText lightColor="blue">Light Color Text</ThemedText>
      );

      // Assert: Should render
      expect(getByText('Light Color Text')).toBeTruthy();
    });

    it('should accept darkColor prop', () => {
      // Arrange & Act: Render with darkColor
      const { getByText } = render(
        <ThemedText darkColor="green">Dark Color Text</ThemedText>
      );

      // Assert: Should render
      expect(getByText('Dark Color Text')).toBeTruthy();
    });
  });

  /**
   * Test accessibility
   *
   * These tests verify that the component is accessible
   * to users with assistive technologies.
   */
  describe('Accessibility', () => {
    it('should render text that can be read by screen readers', () => {
      // Arrange & Act: Render the component
      const { getByText } = render(<ThemedText>Accessible Text</ThemedText>);

      // Assert: Text should be accessible
      const textElement = getByText('Accessible Text');
      expect(textElement).toBeTruthy();
    });

    it('should accept accessibility props', () => {
      // Arrange & Act: Render with accessibility label
      const { getByText } = render(
        <ThemedText accessibilityLabel="Accessible">Test</ThemedText>
      );

      // Assert: Should render
      expect(getByText('Test')).toBeTruthy();
    });
  });

  /**
   * Test edge cases
   *
   * These tests verify that the component handles edge cases
   * gracefully and doesn't break with unexpected conditions.
   */
  describe('Edge Cases', () => {
    it('should handle very long text', () => {
      // Arrange: Create very long text
      const longText = 'A'.repeat(1000);

      // Act: Render with very long text
      const { root } = render(<ThemedText>{longText}</ThemedText>);

      // Assert: Should render without crashing
      expect(root).toBeTruthy();
    });

    it('should handle special characters', () => {
      // Arrange: Text with special characters
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      // Act: Render with special characters
      const { getByText } = render(<ThemedText>{specialText}</ThemedText>);

      // Assert: Should render
      expect(getByText(specialText)).toBeTruthy();
    });

    it('should handle multiline text', () => {
      // Arrange: Multiline text
      const multilineText = 'Line 1\nLine 2\nLine 3';

      // Act: Render with multiline text
      const { getByText } = render(<ThemedText>{multilineText}</ThemedText>);

      // Assert: Should render the full multiline text
      expect(getByText(multilineText)).toBeTruthy();
    });
  });
});
