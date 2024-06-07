import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { GetStarted } from '../GetStarted';

describe('GetStarted', () => {
  beforeEach(() => {
    render(<GetStarted />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const get_started = screen.getByTestId('started-header');
    expect(get_started).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const started_header = screen.getByRole('heading', { level: 2, name: /Get started with/ });
    expect(started_header).toHaveTextContent('Get started with our API in 3 simple steps:');
  });
  it('should navigate to the correct links on click', () => {
    expect(screen.getByTestId('signUp').closest('a')).toHaveAttribute(
      'href',
      'https://deriv.com/signup/',
    );
    expect(screen.getByTestId('register').closest('a')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByTestId('guide').closest('a')).toHaveAttribute(
      'href',
      '/docs/category/guides',
    );
  });
});
