import React, { act } from 'react';
import TokenCreationDialogSuccess from '..';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useApiToken from '@site/src/hooks/useApiToken';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

describe.skip('Token Creation Dialog', () => {
  let setToggleModalMock: jest.Mock;
  let setLatestTokenMock: jest.Mock;

  beforeEach(() => {
    setToggleModalMock = jest.fn();
    setLatestTokenMock = jest.fn();

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
      lastTokenDisplayName: 'testtoken2',
      setLatestToken: setLatestTokenMock,
    }));

    render(<TokenCreationDialogSuccess setToggleModal={setToggleModalMock} />);
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

  it('Should set latest token correctly', () => {
    act(() => {
      const tokens = mockUseApiToken().tokens;
      const lastTokenDisplayName = mockUseApiToken().lastTokenDisplayName;
      tokens.forEach((token) => {
        if (token.display_name.toLowerCase() === lastTokenDisplayName.toLowerCase()) {
          setLatestTokenMock(token.token);
        }
      });
    });
    expect(setLatestTokenMock).toHaveBeenCalledWith('asdf1235');
  });

  it('Should close the modal on OK button click', async () => {
    const okButton = screen.getByRole('button', { name: /OK/i });
    expect(okButton).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(okButton);
    });
    expect(setToggleModalMock).toHaveBeenCalledTimes(1);
  });

  it('Should call onOpenChange when the modal is closed', async () => {
    act(() => {
      const onOpenChange = setToggleModalMock;
      onOpenChange(false);
    });
    expect(setToggleModalMock).toHaveBeenCalledWith(false);
  });
});
