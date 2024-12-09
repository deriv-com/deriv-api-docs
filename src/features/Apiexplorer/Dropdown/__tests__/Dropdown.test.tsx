import React, { act } from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Dropdown, TDropdown } from '../Dropdown';
import userEvent from '@testing-library/user-event';

const mockProps: TDropdown = {
  selected: '',
  setSelected: jest.fn(),
  handleChange: jest.fn(),
  selected_value: 'Select API Call - Version 3',
};

describe.skip('Dropdown', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render the Dropdown', () => {
    render(<Dropdown {...mockProps} />);
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  it('should have initial value as "Select API Call - Version 3"', () => {
    render(<Dropdown {...mockProps} />);
    const initial_text = screen.getByText(/Select API Call - Version 3/i);
    expect(initial_text).toBeInTheDocument();
  });

  it('should render the options on click ', async () => {
    render(<Dropdown {...mockProps} />);
    const select = await screen.findByText(/Select API Call/i);
    await act(async () => {
      await userEvent.click(select);
    });

    const option_list = await screen.findByText(/active symbols/i);
    expect(option_list).toBeVisible();
  });

  it('should close the dropdown when selecting an option ', async () => {
    render(<Dropdown {...mockProps} />);
    const select = await screen.findByText(/Select API Call/i);
    await act(async () => {
      await userEvent.click(select);
    });

    const option_list = await screen.findByText(/active symbols/i);
    expect(option_list).toBeVisible();

    await act(async () => {
      await userEvent.click(option_list);
    });
    expect(option_list).not.toBeVisible();
  });

  it('should close the dropdown when clicking outside of the element', async () => {
    render(
      <div>
        <button>testButton</button>
        <Dropdown {...mockProps} />
      </div>,
    );
    const select = await screen.findByText(/Select API Call/i);
    await act(async () => {
      await userEvent.click(select);
    });

    const option_list = await screen.findByText(/active symbols/i);
    expect(option_list).toBeVisible();

    const outside_element = await screen.findByRole('button', { name: /testButton/i });
    await act(async () => {
      await userEvent.click(outside_element);
    });
    expect(option_list).not.toBeVisible();
  });

  it('should test filter option correctly', async () => {
    render(<Dropdown {...mockProps} />);
    const select = await screen.findByText(/Select API Call/i);
    await act(async () => {
      await userEvent.click(select);
    });

    const search_bar = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.clear(search_bar);
      await userEvent.type(search_bar, 'Active Symbols');
    });

    const options = screen.getAllByText('Active Symbols');

    expect(options.length).toBe(1);
  });
});
