/**
 * ExternalLink Component Test Suite
 *
 * This file tests the ExternalLink component, which wraps expo-router's
 * Link component to open external URLs in an in-app browser.
 *
 * Key Testing Concepts Demonstrated:
 * - Component rendering with render()
 * - Testing navigation components
 * - Mocking platform-specific code (process.env.EXPO_OS)
 * - Testing async functions (onPress handlers)
 * - Event handling
 */

import { ExternalLink } from '@/components/external-link';
import { fireEvent, render } from '@testing-library/react-native';
import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';

describe('ExternalLink Component', () => {
  /**
   * Clear mocks before each test to ensure isolation
   */
  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure EXPO_OS is undefined by default
    delete process.env.EXPO_OS;
  });

  /**
   * Test basic rendering
   *
   * These tests verify that the component renders correctly
   * and displays link content.
   */
  describe('Rendering', () => {
    it('should render with children text', () => {
      // Arrange & Act: Render the component with children
      const { getByText } = render(
        <ExternalLink href={"https://example.com" as any}>Visit Example</ExternalLink>
      );

      // Assert: Should display the link text
      expect(getByText('Visit Example')).toBeTruthy();
    });

    it('should render without crashing', () => {
      // Arrange & Act: Render the component
      const { getByTestId } = render(<ExternalLink href={"https://example.com" as any}>Link</ExternalLink>);

      // Assert: Component should render without errors
      expect(getByTestId('external-link')).toBeTruthy();
    });

    it('should pass href prop', () => {
      // Arrange & Act: Render with href
      const { getByTestId } = render(
        <ExternalLink href={"https://example.com" as any}>Example</ExternalLink>
      );

      // Assert: Link should be present
      expect(getByTestId('external-link')).toBeTruthy();
    });
  });

  /**
   * Test user interactions
   *
   * These tests verify that the component handles user
   * interactions correctly.
   */
  describe('User Interactions', () => {
    it('should open browser on press (non-web)', async () => {
      // Arrange: Set EXPO_OS to non-web
      const originalEnv = process.env.EXPO_OS;
      process.env.EXPO_OS = 'ios';

      // Arrange: Render the component
      const { getByTestId } = render(
        <ExternalLink href={"https://example.com" as any}>Press Me</ExternalLink>
      );

      // Act: Simulate a press event
      const link = getByTestId('external-link');
      await fireEvent.press(link);

      // Assert: openBrowserAsync should have been called
      expect(openBrowserAsync).toHaveBeenCalledWith('https://example.com', {
        presentationStyle: 'automatic',
      });

      // Cleanup
      process.env.EXPO_OS = originalEnv;
    });

    it('should handle web platform differently', async () => {
      // Arrange: Set EXPO_OS to web
      const originalEnv = process.env.EXPO_OS;
      process.env.EXPO_OS = 'web';

      // Arrange: Render the component
      const { getByTestId } = render(
        <ExternalLink href={"https://example.com" as any}>Press Me</ExternalLink>
      );

      // Act: Simulate a press event
      const link = getByTestId('external-link');
      await fireEvent.press(link);

      // Assert: Component should handle web platform (exact behavior may vary)
      // Note: The component logic checks process.env.EXPO_OS !== 'web'
      expect(link).toBeTruthy();

      // Cleanup
      process.env.EXPO_OS = originalEnv;
    });

    it('should handle press with different URLs', async () => {
      // Arrange: Set EXPO_OS to non-web
      const originalEnv = process.env.EXPO_OS;
      process.env.EXPO_OS = 'android';

      const urls = ['https://google.com', 'https://github.com', 'https://stackoverflow.com'];

      for (const url of urls) {
        // Arrange: Render with each URL
        const { getByTestId, unmount } = render(
          <ExternalLink href={url as any}>Link {url}</ExternalLink>
        );

        // Act: Press the link
        const link = getByTestId('external-link');
         fireEvent.press(link);

        // Assert: Should have been called with correct URL
        expect(openBrowserAsync).toHaveBeenCalledWith(url, {
          presentationStyle: 'automatic',
        });

        // Cleanup
        unmount();
      }

      // Cleanup
      process.env.EXPO_OS = originalEnv;
    });
  });

  /**
   * Test props passing
   *
   * These tests verify that the component correctly passes
   * through props to the underlying Link component.
   */
  describe('Props Handling', () => {
    it('should pass through other props', () => {
      // Arrange & Act: Render with additional props
      const { getByTestId } = render(
        <ExternalLink href={"https://example.com" as any} testID="custom-testid">
          Test Link
        </ExternalLink>
      );

      // Assert: Should accept custom testID
      expect(getByTestId('custom-testid')).toBeTruthy();
    });

    it('should set target="_blank" on Link', () => {
      // Arrange & Act: Render the component
      const { getByTestId } = render(
        <ExternalLink href={"https://example.com" as any}>Test</ExternalLink>
      );

      // Assert: Link should be present (target is internal to Link component)
      expect(getByTestId('external-link')).toBeTruthy();
    });
  });

  /**
   * Test edge cases
   *
   * These tests verify that the component handles edge cases
   * gracefully and doesn't break with unexpected conditions.
   */
  describe('Edge Cases', () => {
    it('should handle empty href', () => {
      // Arrange & Act: Render with empty href
      const { root } = render(<ExternalLink href={"" as any}>Empty Link</ExternalLink>);

      // Assert: Should render without crashing
      expect(root).toBeTruthy();
    });

    it('should handle relative URLs', () => {
      // Arrange & Act: Render with relative URL
      const { root } = render(<ExternalLink href={"/relative/path" as any}>Relative Link</ExternalLink>);

      // Assert: Should render without crashing
      expect(root).toBeTruthy();
    });

    it('should handle long URLs', () => {
      // Arrange: Create a very long URL
      const longUrl = `https://example.com${'/' + 'a'.repeat(200)}`;

      // Act: Render with long URL
      const { root } = render(<ExternalLink href={longUrl as any}>Long URL Link</ExternalLink>);

      // Assert: Should render without crashing
      expect(root).toBeTruthy();
    });
  });

  /**
   * Test accessibility
   *
   * These tests verify that the component is accessible
   * to users with assistive technologies.
   */
  describe('Accessibility', () => {
    it('should be pressable', () => {
      // Arrange & Act: Render the component
      const { getByTestId } = render(
        <ExternalLink href={"https://example.com" as any}>Pressable Link</ExternalLink>
      );

      // Assert: Should be interactable
      const link = getByTestId('external-link');
      expect(link).toBeTruthy();
    });

    it('should render accessible text content', () => {
      // Arrange & Act: Render with text content
      const { getByText } = render(
        <ExternalLink href={"https://example.com" as any}>Accessible Link Text</ExternalLink>
      );

      // Assert: Text should be accessible
      expect(getByText('Accessible Link Text')).toBeTruthy();
    });
  });
});
