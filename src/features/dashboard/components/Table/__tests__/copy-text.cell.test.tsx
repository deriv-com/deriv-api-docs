import React from 'react';
import { render, screen } from '@site/src/test-utils';
import CopyTextCell from '../copy-text.cell';
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
});
