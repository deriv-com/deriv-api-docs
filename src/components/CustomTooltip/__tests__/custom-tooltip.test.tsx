import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import CustomTooltip from '..';
import userEvent from '@testing-library/user-event';

describe('CustomTooltip', () => {
  beforeEach(() => {
    render(
      <CustomTooltip text='tooltip text'>
        <div>outer text</div>
      </CustomTooltip>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the custom tooltip with children', () => {
    const text = screen.getByText('outer text');
    expect(text).toBeInTheDocument();
  });

  it('should render the tooltip text on hover', async () => {
    const text = screen.getByText('outer text');
    await userEvent.hover(text);
    const tooltip_text = screen.getAllByText('tooltip text');
    expect(tooltip_text[0]).toBeInTheDocument();
  });
});
