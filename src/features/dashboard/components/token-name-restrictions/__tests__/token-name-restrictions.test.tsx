import React from 'react';
import { render, screen } from '@site/src/test-utils';
import TokenNameRestrictions from '../token-name-restrictions';

describe('Restrictions for App name', () => {
  beforeEach(() => {
    render(<TokenNameRestrictions />);
  });
  it('Should render the list', () => {
    const RestrictonList = screen.getByRole('list');
    expect(RestrictonList).toBeInTheDocument();
  });

  it('Should display correct content inside list items', () => {
    const listItem1 = screen.getByText(
      'Only alphanumeric characters with spaces and underscores are allowed.',
    );
    const listItem2 = screen.getByText('Only 2-32 characters are allowed');
    const listItem3 = screen.getByText(
      'No duplicate token names are allowed for the same account.',
    );
    const listItem4 = screen.getByText(
      'No keywords "deriv" or "binary" or words that look similar, e.g. "_binary_" or "d3riv" are allowed.',
    );

    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();
    expect(listItem4).toBeInTheDocument();
  });
});
