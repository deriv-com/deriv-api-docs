import React from 'react';
import { render, screen } from '@site/src/test-utils';
import TokenRegistration from '..';

describe('Register Tokens', () => {
  const renderRegisterTokenComponent = () => {
    return render(<TokenRegistration />);
  };

  it('Should render the component', () => {
    renderRegisterTokenComponent();
    const headingText = screen.getByText('Create new token');
    expect(headingText).toBeInTheDocument();
  });
});
