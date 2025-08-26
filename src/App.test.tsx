// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { vi, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

vi.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: () => Promise.resolve({})
    }
  }
}));

vi.mock('./components/HyperspeedBackground', () => ({
  HyperspeedBackground: () => <div />
}));

import App from './App';

test('renders Nexius Labs footer text', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const elements = await screen.findAllByText(/NEXIUS Labs/i);
  expect(elements.length).toBeGreaterThan(0);
});
