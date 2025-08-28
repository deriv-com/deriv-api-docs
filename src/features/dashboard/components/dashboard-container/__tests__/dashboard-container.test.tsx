import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import DashboardContainer from '..';

describe('DashboardContainer', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render the page heading', () => {
    render(
      <DashboardContainer>
        <p>Mock Element</p>
      </DashboardContainer>,
    );

    const label = screen.getByText(/App dashboard/i);
    expect(label).toBeInTheDocument();
  });

  it('Should render children component in the screen', () => {
    render(
      <DashboardContainer>
        <div>Test Component</div>
      </DashboardContainer>,
    );
    const label = screen.getByText(/Test Component/i);
    expect(label).toBeInTheDocument();
  });
});
