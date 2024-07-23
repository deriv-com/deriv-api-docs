import useScrollTo from '..';
import { renderHook } from '@testing-library/react';

describe('useScrollTo', () => {
  const ref = {
    current: {
      scrollTo: jest.fn(),
    },
  };

  it('should be able to run the scrollTo function on initial render', async () => {
    renderHook(() => useScrollTo(ref, [], true));
    expect(ref.current.scrollTo).toHaveBeenCalledTimes(1);
  });
});
