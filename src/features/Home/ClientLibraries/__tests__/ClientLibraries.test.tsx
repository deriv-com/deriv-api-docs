import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { ClientLibraries } from '../ClientLibraries';

describe('ClientLibraries', () => {
  beforeEach(() => {
    render(<ClientLibraries />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const client_header = screen.getByTestId('client-header');
    expect(client_header).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const client_text = screen.getByText('Comprehensive all-in-one client library');
    expect(client_text).toBeInTheDocument();
  });
  it('should render subtitle text properly', () => {
    const client_subtitle = screen.getByText(
      'Simplify your development processes and get your app up and running faster with the client library of your choice.',
    );
    expect(client_subtitle).toBeInTheDocument();
  });
  it('should navigate to the correct links on click', () => {
    expect(screen.getByText('Go to the JavaScript library').closest('a')).toHaveAttribute(
      'href',
      'https://deriv-com.github.io/deriv-api/',
    );
    expect(screen.getByText('Go to the Python library').closest('a')).toHaveAttribute(
      'href',
      'https://binary-com.github.io/python-deriv-api/',
    );
    expect(screen.getByText('Go to the Flutter library').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/deriv-com/flutter-deriv-api',
    );
  });
});
