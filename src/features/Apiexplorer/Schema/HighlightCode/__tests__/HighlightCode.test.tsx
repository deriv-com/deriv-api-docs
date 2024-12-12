import React from 'react';
import { HighlightCode } from '..';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('HighlightCode', () => {
  it('should render HighlightCode properly', async () => {
    render(<HighlightCode description={'This is a `highlight` test'} />);
    const first = await screen.findByText(/this is a/i);
    expect(first).toBeVisible();

    const highlight = await screen.findByText(/highlight/i);
    expect(highlight).toBeVisible();

    const second = await screen.findByText(/test/i);
    expect(second).toBeVisible();
  });

  it('should render nothing if there is no description', () => {
    const empty_highlight = render(<HighlightCode description={null} />);
    expect(empty_highlight.container.firstChild).toBe(null);
  });
});
