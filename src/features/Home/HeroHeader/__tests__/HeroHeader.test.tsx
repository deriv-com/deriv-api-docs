import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { HeroHeader } from '../HeroHeader';

beforeEach(() => {
  render(<HeroHeader />);
});

afterEach(cleanup);

describe('HeroHeader', () => {
  it('should render properly', () => {
    const hero_header = screen.getByTestId('hero-header');
    expect(hero_header).toBeInTheDocument();
  });

  it('should render hero title properly', () => {
    const hero_title = screen.getByRole('heading', { level: 2 });
    expect(hero_title).toHaveTextContent('Build with the new Deriv API');
  });

  it('should render hero subtitle text properly', () => {
    const hero_subtitle = screen.getByTestId('hero-header-subtitle');
    expect(hero_subtitle).toHaveTextContent(
      "It's faster to integrate, comes with OAuth 2.0 authentication, and built around how developers actually work. Legacy API remains available as the same old dashboard while you migrate to the new Deriv API.",
    );
  });
});
