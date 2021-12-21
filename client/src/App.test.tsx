import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initial text', () => {
  render(<App />);
  const linkElement = screen.getByText(/home view/i);
  expect(linkElement).toBeInTheDocument();
});
