import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { WaysToEarn } from '../WaysToEarn';

beforeEach(() => {
  render(<WaysToEarn />);
});

afterEach(cleanup);

describe('WaysToEarn', () => {
  it('renders properly', () => {
    const main_element = screen.getByTestId('ways-to-earn');
    expect(main_element).toBeInTheDocument();
  });
  it('renders the title', () => {
    const title = screen.getByText(/ways to earn with deriv api/i);
    expect(title).toBeInTheDocument();
  });
  it('renders the badges', () => {
    const badge_one = screen.getByText(/register your app with deriv/i);
    const badge_two = screen.getByText(/sign up as an affiliate/i);
    expect(badge_one).toBeVisible();
    expect(badge_two).toBeVisible();
  });
});
