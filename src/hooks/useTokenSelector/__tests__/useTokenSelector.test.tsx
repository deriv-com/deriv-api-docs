import { act } from 'react';
import useTokenSelector from '..';
import useApiToken from '../../useApiToken';
import { renderHook } from '@testing-library/react';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
  updateCurrentToken: jest.fn(),
}));

describe('useTokenSelector', () => {
  it('should be able to switch to an account', () => {
    const { result } = renderHook(() => useTokenSelector());

    act(() => {
      // Call the function with a properly structured token object
      result.current.onSelectToken({
        token: 'test-token',
        display_name: 'Test Token',
        scopes: ['read', 'trade'],
      });
    });

    expect(mockUseApiToken).toBeCalledTimes(1);
  });
});
