import React from 'react';
import { render, screen } from '@site/src/test-utils';
import RestrictionsAppname from '..';

describe('Restrictions for App name', () => {
  it('Should render the list', () => {
    render(<RestrictionsAppname />);

    const AppRestrictionList = screen.getByRole('list');
    expect(AppRestrictionList).toBeInTheDocument();
  });

  it('Should display correct content inside list items', () => {
    render(<RestrictionsAppname />);

    const listItem1 = screen.getByText(
      'Only alphanumeric characters with spaces and underscores are allowed.',
    );
    const listItem2 = screen.getByText('The name can contain up to 48 characters.');
    const listItem3 = screen.getByText('Duplicate token names aren’t allowed.');
    const listItem4 = screen.getByText(
      'The name cannot contain “Binary”, “Deriv”, or similar words.',
    );

    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();
    expect(listItem4).toBeInTheDocument();
  });
});
