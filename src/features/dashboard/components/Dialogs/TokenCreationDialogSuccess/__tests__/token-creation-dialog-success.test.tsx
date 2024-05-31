import React from 'react';
import TokenCreationDialogSuccess from '..';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useApiToken from '@site/src/hooks/useApiToken';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

describe('Token Creation Dialog', () => {
  beforeEach(() => {
    mockUseApiToken.mockImplementation(() => ({
      tokens: [
        {
          display_name: 'testtoken1',
          last_used: '',
          scopes: ['read', 'trade', 'payments', 'admin'],
          token: 'asdf1234',
          valid_for_ip: '',
        },
        {
          display_name: 'testtoken2',
          last_used: '',
          scopes: ['read', 'trade', 'payments', 'admin'],
          token: 'asdf1235',
          valid_for_ip: '',
        },
      ],
      lastTokenDisplayName: 'agrim',
    }));

    render(<TokenCreationDialogSuccess setToggleModal={jest.fn()} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should display correct title on the modal', () => {
    const title = screen.getAllByText(/Token created successfully!/i);
    expect(title).toHaveLength(1);
    expect(title[0]).toHaveTextContent('Token created successfully!');
  });

  it('Should display correct content on the modal', () => {
    const textContent = screen.getAllByText(
      /Please save this token key. For security reasons, it can't be viewed or copied again. If you lose this key, you'll need to generate a new token./i,
    );
    expect(textContent).toHaveLength(1);
    expect(textContent[0]).toHaveTextContent(
      /Please save this token key. For security reasons, it can't be viewed or copied again. If you lose this key, you'll need to generate a new token./i,
    );
  });

  it('Should close the modal on OK button click', async () => {
    const mockOnClose = jest.fn();

    render(<TokenCreationDialogSuccess setToggleModal={mockOnClose} />);

    const okButton = screen.getByRole('button', { name: /OK/i });
    expect(okButton).toBeInTheDocument();

    await userEvent.click(okButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
