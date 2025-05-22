import React from 'react';
import { render, screen } from '@site/src/test-utils';
import CopyTextCell from '../cell-copy-text';
import userEvent from '@testing-library/user-event';

describe('CopyTextCell', () => {
  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  it('Should render the copy button', () => {
    render(
      <CopyTextCell
        cell={{
          value: '1234',
        }}
      />,
    );
    const label = screen.getByText(/1234/i);
    expect(label).toBeInTheDocument();
  });

  it('Should copy text in the clipboard', async () => {
    render(
      <CopyTextCell
        cell={{
          value: '1234',
        }}
      />,
    );
    const label = screen.getByText(/1234/i);
    await userEvent.click(label);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('1234');
  });

  it('Should display tooltip text on hover', async () => {
    render(
      <CopyTextCell
        cell={{
          value: '1234',
        }}
      />,
    );
    const label = screen.getByText(/1234/i);
    const tooltip = screen.getByText(/Copy/i).parentElement as HTMLElement;
    expect(tooltip.classList.contains('visible')).toBe(false);
    await userEvent.hover(label);
    expect(tooltip.classList.contains('visible')).toBe(true);
    await userEvent.unhover(label);
    expect(tooltip.classList.contains('visible')).toBe(false);
  });
});
