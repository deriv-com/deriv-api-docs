import React from 'react';
import { render, screen } from '@site/src/test-utils';
import TokenManagePage from '../token-manage-page';

describe('Token Manage', () => {
  const renderTokenManagePageComponent = () => {
    return render(<TokenManagePage />);
  };

  it('Should render the component', () => {
    renderTokenManagePageComponent();
    const headingText = screen.getByText('API token manager');
    expect(headingText).toBeInTheDocument();
  });
});
