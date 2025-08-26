import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeatureCard } from '../FeatureCard';

describe('FeatureCard', () => {
  it('renders heading text', () => {
    render(
      <MemoryRouter>
        <FeatureCard />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        name: /AI Solution Showcases & Product Demos/i,
      })
    ).toBeInTheDocument();
  });
});
