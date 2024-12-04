import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import HeroHeader from '..';

beforeEach(() => {
  render(<HeroHeader />);
});

afterEach(cleanup);

describe('HeroHeader', () => {
  it('should render properly', () => {
    const hero_header = screen.getByTestId('hero-header');
    expect(hero_header).toBeInTheDocument();
  });
});
