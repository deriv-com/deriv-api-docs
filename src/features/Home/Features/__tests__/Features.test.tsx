import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import Features from '..';

describe('ClientLibraries', () => {
  beforeEach(() => {
    render(<Features title='test' description='test description'/>);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const client_header = screen.getByTestId('feature_section');
    expect(client_header).toBeInTheDocument();
  });
});
