import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import CustomTabs from '..';
import userEvent from '@testing-library/user-event';

const mock_tabs = [
  { label: 'tab_1', content: 'content 1' },
  { label: 'tab_2', content: 'content 2' },
];

describe('CustomTabs', () => {
  beforeEach(() => {
    render(<CustomTabs tabs={mock_tabs}></CustomTabs>);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the custom tabs', () => {
    const tab = screen.getByText('tab_1');
    expect(tab).toBeInTheDocument();
  });

  it('should change tab content on different tab click', async () => {
    const tab = screen.getByText('tab_2');
    await userEvent.click(tab);
    const content = screen.getByText('content 2');
    expect(content).toBeInTheDocument();
  });
});
