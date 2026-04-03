/* eslint-env jest */
import { render, screen } from '@testing-library/react';

test('renders Hexlet Chat link', () => {
  const { container } = render(<a href="/">Hexlet Chat</a>);
  expect(container.querySelector('a')).toBeInTheDocument();
  expect(screen.getByText('Hexlet Chat')).toBeInTheDocument();
});

test('renders login button', () => {
  render(<button type="submit">Log in</button>);
  expect(screen.getByText('Log in')).toBeInTheDocument();
});

test('renders signup button', () => {
  render(<button type="submit">Sign up</button>);
  expect(screen.getByText('Sign up')).toBeInTheDocument();
});

test('renders send button', () => {
  render(<button type="submit">Send</button>);
  expect(screen.getByText('Send')).toBeInTheDocument();
});

test('renders username input', () => {
  const { container } = render(<input placeholder="Your nickname" />);
  expect(container.querySelector('input')).toBeInTheDocument();
});