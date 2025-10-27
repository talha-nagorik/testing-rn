# React Native Testing Guide

This directory contains comprehensive test suites for the React Native Counter App, demonstrating modern testing best practices and patterns.

## 📁 Test Structure

```
__tests__/
├── README.md                    # This file - testing documentation
├── counter-utils.test.ts        # Unit tests for utility functions
├── use-counter.test.ts          # Hook tests for custom hook
└── ui-components.test.tsx       # UI component tests with examples
```

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test counter-utils.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="should increment"
```

### Test Output

When you run tests, you'll see output like:
```
PASS __tests__/counter-utils.test.ts
PASS __tests__/use-counter.test.ts
PASS __tests__/ui-components.test.tsx

Test Suites: 3 passed, 3 total
Tests: 49 passed, 49 total
```

## 🧪 Testing Patterns Demonstrated

### 1. Unit Testing (`counter-utils.test.ts`)
**What it tests:** Pure functions in isolation
**Key concepts:**
- Testing business logic without side effects
- Edge cases and boundary conditions
- Input/output validation

```typescript
// Example: Testing a pure function
it('should format positive numbers with leading zeros', () => {
  expect(formatNumber(5)).toBe('0005');
  expect(formatNumber(42)).toBe('0042');
});
```

### 2. Hook Testing (`use-counter.test.ts`)
**What it tests:** Custom React hooks
**Key concepts:**
- Using `renderHook()` to test hooks
- Using `act()` for state updates
- Mocking external dependencies

```typescript
// Example: Testing a custom hook
it('should increment count by 1', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### 3. Component Testing (`ui-components.test.tsx`)
**What it tests:** React components with user interactions
**Key concepts:**
- Using `render()` to mount components
- Using `fireEvent` for user interactions
- Testing props and callbacks
- Testing state management in components

```typescript
// Example: Testing component interaction
it('should call onPress when button is pressed', () => {
  const mockOnPress = jest.fn();
  const { getByText } = render(
    <TestButton label="Press Me" onPress={mockOnPress} />
  );
  
  fireEvent.press(getByText('Press Me'));
  expect(mockOnPress).toHaveBeenCalledTimes(1);
});
```

**Note:** This uses simple test components to demonstrate UI testing patterns without the complexity of `react-native-reanimated` mocking.

## 🛠️ Testing Tools Used

### Core Testing Libraries
- **Jest**: Test runner and assertion library
- **@testing-library/react-native**: React Native testing utilities
- **jest-expo**: Expo-specific Jest configuration

### Key Testing Utilities
- `render()`: Mount React components for testing
- `renderHook()`: Test custom hooks
- `fireEvent`: Simulate user interactions
- `act()`: Wrap state updates
- `jest.fn()`: Create mock functions
- `jest.mock()`: Mock external dependencies

### Mocking
- `jest.mock()`: Mock external dependencies
- `jest.fn()`: Create mock functions
- `jest.clearAllMocks()`: Reset mocks between tests

## 📋 Testing Best Practices Applied

### ✅ Test Structure
- **Arrange-Act-Assert (AAA)**: Clear test structure
- **Descriptive names**: Tests follow "should..." pattern
- **One concept per test**: Each test focuses on one behavior
- **Comprehensive comments**: Educational documentation

### ✅ Coverage Areas
- **Happy path**: Normal function behavior and user interactions
- **Edge cases**: Boundary conditions and unusual inputs
- **Error handling**: Graceful failure scenarios
- **State management**: Hook state transitions and component state
- **User interactions**: Button presses, form inputs, and user flows

### ✅ Mocking Strategy
- **External dependencies**: Mock Expo modules and native APIs
- **Platform APIs**: Mock device-specific functionality

## 🎯 Test Categories Explained

### Unit Tests
**Purpose:** Test individual functions in isolation
**Example:** `formatNumber(42)` should return `"0042"`
**When to use:** Pure functions, utility functions, business logic

### Component Tests (`ui-components.test.tsx`)
**Purpose:** Test React components with user interactions
**Example:** Button should call `onPress` when clicked, counter should update when buttons are pressed
**When to use:** UI components, user interactions, props handling, state management

### Hook Tests
**Purpose:** Test custom React hooks
**Example:** `useCounter()` should manage count state correctly
**When to use:** State management, side effects, custom logic

## 🔧 Configuration Files

### `jest.setup.js`
Contains global test configuration:
- Mocks for React Native and Expo modules
- Global test timeout settings
- Console warning suppression

### `package.json` (Jest config)
```json
{
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "moduleNameMapping": {
      "^@/(.*)$": "<rootDir>/$1"
    },
    "collectCoverageFrom": [
      "**/*.{ts,tsx}",
      "!**/*.d.ts",
      "!**/node_modules/**",
      "!**/__tests__/**"
    ]
  }
}
```

## 🐛 Common Testing Patterns

### Testing Async Operations
```typescript
it('should handle async state updates', async () => {
  const { getByText } = render(<MyComponent />);
  
  fireEvent.press(getByText('Async Button'));
  
  await waitFor(() => {
    expect(getByText('Updated Text')).toBeTruthy();
  });
});
```

### Testing Callback Functions
```typescript
it('should call callback with correct parameters', () => {
  const mockCallback = jest.fn();
  const { getByText } = render(
    <MyComponent onAction={mockCallback} />
  );
  
  fireEvent.press(getByText('Action Button'));
  
  expect(mockCallback).toHaveBeenCalledWith('expected-param');
});
```

### Testing Conditional Rendering
```typescript
it('should show content when condition is true', () => {
  const { getByText } = render(
    <MyComponent showContent={true} />
  );
  
  expect(getByText('Conditional Content')).toBeTruthy();
});

it('should hide content when condition is false', () => {
  const { queryByText } = render(
    <MyComponent showContent={false} />
  );
  
  expect(queryByText('Conditional Content')).toBeNull();
});
```

### Testing Accessibility
```typescript
it('should be accessible by role', () => {
  const { getByRole } = render(<MyComponent />);
  
  expect(getByRole('button')).toBeTruthy();
});

it('should have accessible label', () => {
  const { getByLabelText } = render(<MyComponent />);
  
  expect(getByLabelText('Accessible Label')).toBeTruthy();
});
```

## 📊 Coverage Goals

The project aims for:
- **80%+ line coverage**: Most code paths tested
- **80%+ branch coverage**: Most conditional logic tested
- **80%+ function coverage**: Most functions tested
- **80%+ statement coverage**: Most statements executed

Run `npm test -- --coverage` to see current coverage.

## 🚨 Troubleshooting

### Common Issues

**Tests fail with "Cannot find module"**
- Check that `@/` alias is configured in Jest
- Verify file paths are correct

**Animation tests fail**
- Ensure `react-native-reanimated` is properly mocked
- Check that animation values are mocked correctly

**Haptic feedback tests fail**
- Verify `expo-haptics` is mocked in `jest.setup.js`
- Check that mock functions are properly configured

**Component doesn't render**
- Check that all required props are provided
- Verify that child components are properly mocked

### Debug Tips

```bash
# Run tests with verbose output
npm test -- --verbose

# Run single test file with debug info
npm test counter-utils.test.ts -- --verbose

# Run tests and keep Jest running
npm run test:watch
```

## 📚 Learning Resources

### React Native Testing
- [React Native Testing Library Docs](https://callstack.github.io/react-native-testing-library/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing React Native Apps](https://reactnative.dev/docs/testing-overview)

### Testing Best Practices
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

## 🎓 Educational Value

This test suite demonstrates:

1. **Core Testing Patterns**: Unit tests and hook tests that work reliably
2. **Real-world Patterns**: Common testing scenarios you'll encounter
3. **Best Practices**: Industry-standard testing approaches
4. **Documentation**: Well-commented code for learning
5. **Focused Coverage**: Testing the most important parts of the app

Each test file includes detailed comments explaining the testing concepts and patterns used, making this an excellent learning resource for React Native testing fundamentals.

## 📝 Component Testing Approach

This project demonstrates UI testing using simple test components that avoid the complexity of `react-native-reanimated` mocking. The `ui-components.test.tsx` file shows:

- **Component Rendering**: How to mount and test React components
- **User Interactions**: Testing button presses and user events
- **State Management**: Testing components that manage their own state
- **Accessibility**: Testing accessibility features and roles
- **Edge Cases**: Testing rapid interactions and unusual conditions

For testing actual project components with animations, consider:
- Testing components without animations
- Using shallow rendering
- Testing component logic separately from presentation
- Mocking `react-native-reanimated` with simpler implementations
