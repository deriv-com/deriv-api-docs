import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import AppDashboardContainer from '..';

describe('AppDashboardContainer', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render the page heading', () => {
    render(<AppDashboardContainer />);

    const label = screen.getByText(/App dashboard/i);
    expect(label).toBeInTheDocument();
  });

  it('Should render children component in the screen', () => {
    render(
      <AppDashboardContainer>
        <div>Test Component</div>
      </AppDashboardContainer>,
    );
    const label = screen.getByText(/Test Component/i);
    expect(label).toBeInTheDocument();
  });
});
