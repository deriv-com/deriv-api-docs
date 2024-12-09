import React, { act } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderHook, waitFor } from '@testing-library/react';
import useDynamicImportJSON from '..';
import { cleanup, render, screen } from '@testing-library/react';

jest.mock('@docusaurus/router', () => ({
  useLocation: () => ({
    pathname: '/api-explorer#active_symbols',
    hash: '#active_symbols',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@site/src/hooks/useAuthContext');

describe('useDynamicImportJSON', () => {
  const { result } = renderHook(() => useDynamicImportJSON());

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should populate text data with the correct values', async () => {
    await waitFor(() => {
      expect(result.current.text_data.selected_value).toEqual('Active Symbols');
    });
  });

  it('should be able to call handleTextAreaInput when typing in a textarea', async () => {
    const spyHandleInputFunction = jest.spyOn(result.current, 'handleTextAreaInput');

    render(<textarea placeholder='testtextarea' onChange={result.current.handleTextAreaInput} />);

    const textarea = screen.getByPlaceholderText('testtextarea');
    expect(textarea).toBeVisible();

    await userEvent.type(textarea, 'test123');
    expect(spyHandleInputFunction).toHaveBeenCalled();
  });

  it('should have the correct hash value in the URL on selection of an api call', () => {
    const location = require('@docusaurus/router').useLocation();
    const url = location.hash;
    expect(url).toMatch('active_symbols');
  });

  it.skip('should check for change in hash value and update text data accordingly', async () => {
    jest.mock('@docusaurus/router', () => ({
      useLocation: () => ({
        pathname: '/api-explorer#active_symbols',
        hash: '#active_symbol',
      }),
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));

    const mockEvent = {
      currentTarget: {
        value: 'active_symbols',
      },
      preventDefault: jest.fn(),
    };

    const spyHandleSelectChange = jest.spyOn(result.current, 'handleSelectChange');

    const mockHandleSelectChange = () =>
      result.current.handleSelectChange(mockEvent, 'active_symbols');

    render(
      <div>
        <button className='simulated_option' onClick={() => mockHandleSelectChange()}>
          Active Symbols
        </button>
      </div>,
    );

    const option = screen.getByRole('button', { name: 'Active Symbols' });
    userEvent.click(option);

    expect(spyHandleSelectChange).toHaveBeenCalled();

    await waitFor(() => {
      expect(result.current.text_data).toEqual({
        request: '{\n  "active_symbols": "brief",\n  "product_type": "basic"\n}',
        selected_value: 'Active Symbols',
        name: 'active_symbols',
      });
    });
  });
});
