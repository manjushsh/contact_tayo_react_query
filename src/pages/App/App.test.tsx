import { render, screen } from '@testing-library/react';
import App from '.';

test('renders contact link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Contact/i);
  expect(linkElement).toBeInTheDocument();
});
