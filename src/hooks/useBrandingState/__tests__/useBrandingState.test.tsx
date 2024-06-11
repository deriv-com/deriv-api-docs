import useBrandingState from '..';
import { act, renderHook } from '@testing-library/react';
import { cleanup } from '@testing-library/react';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useBrandingState', () => {
  afterEach(() => {
    window.localStorage.clear();
    cleanup();
  });

  it('should show branding by default', () => {
    const { result } = renderHook(() => useBrandingState());
    expect(result.current.is_official_domain).toEqual(true);
  });

  it('should hide branding when featureflag is set', () => {
    act(() => {
      localStorage.setItem('hideBranding', '1');
    });

    const { result } = renderHook(() => useBrandingState());
    expect(result.current.is_official_domain).toEqual(false);
  });

  it('should show branding when featureflag is set', () => {
    act(() => {
      localStorage.setItem('hideBranding', '0');
    });

    const { result } = renderHook(() => useBrandingState());
    expect(result.current.is_official_domain).toEqual(true);
  });
});
