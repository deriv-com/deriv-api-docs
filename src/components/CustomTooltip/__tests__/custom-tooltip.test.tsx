import React, { act } from 'react';
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
    await act(() => {
      userEvent.hover(text);
    });
    const tooltip_text = await screen.findAllByText('tooltip text');
    expect(tooltip_text[0]).toBeInTheDocument();
  });

  it('should show tooltip when open prop is true', () => {
    cleanup();
    render(
      <CustomTooltip text='tooltip text' open>
        <div>inner text</div>
      </CustomTooltip>,
    );
    const tooltip_text = screen.getAllByText('tooltip text')[0];
    expect(tooltip_text).toBeInTheDocument();
  });
});
