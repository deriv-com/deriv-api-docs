import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import ClientLibraries from '..';

describe('ClientLibraries', () => {
  beforeEach(() => {
    render(<ClientLibraries />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const client_header = screen.getByTestId('about_section');
    expect(client_header).toBeInTheDocument();
  });
});
