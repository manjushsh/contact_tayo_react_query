import { render, screen } from '@testing-library/react';
import Contacts from '.';

test('renders Contact link', () => {
  render(<Contacts />);
  const linkElement = screen.getByText(/Contact/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Maps and Charts link', () => {
    render(<Contacts />);
    const linkElement = screen.getByText(/Charts & Maps/i);
    expect(linkElement).toBeInTheDocument();
  });
