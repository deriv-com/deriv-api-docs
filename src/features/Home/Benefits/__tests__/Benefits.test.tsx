import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import Benefits from '..';

describe('Benefits', () => {
  beforeEach(() => {
    render(<Benefits />);
  });

  afterEach(cleanup);

  it('should render the component', () => {
    const benefits = screen.getByTestId('benefits_section');
    expect(benefits).toBeInTheDocument();
  });
});
