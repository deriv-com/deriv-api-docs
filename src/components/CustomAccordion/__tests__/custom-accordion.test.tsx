import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import CustomAccordion from '..';
import userEvent from '@testing-library/user-event';

const mock_accordion_items = [
  { header: 'header_1', content: 'content 1' },
  { header: 'header_2', content: 'content 2' },
];

describe('CustomAccordion', () => {
  beforeEach(() => {
    render(<CustomAccordion items={mock_accordion_items} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the custom accordion', () => {
    const header = screen.getByText('header_1');
    expect(header).toBeInTheDocument();
  });

  it('should open accordion content on click', async () => {
    const header = screen.getByText('header_2');
    await userEvent.click(header);
    const content = screen.getByText('content 2');
    expect(content).toBeInTheDocument();
  });
});
