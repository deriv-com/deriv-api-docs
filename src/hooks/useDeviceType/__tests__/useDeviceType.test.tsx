import { renderHook } from '@testing-library/react';
import useDeviceType from '..';

describe('Use Device Type', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query) => ({
        matches:
          query === '(max-width: 768px)' ? false : query === '(max-width: 1024px)' ? false : true,
      })),
    });
  });

  it('should return desktop by default', () => {
    const { result } = renderHook(() => useDeviceType());
    expect(result.current.deviceType).toBe('desktop');
  });

  it('should return mobile when window width is less than 768px', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 768px)',
    }));

    const { result } = renderHook(() => useDeviceType());
    window.dispatchEvent(new Event('resize'));
    expect(result.current.deviceType).toBe('mobile');
  });

  it('should return tablet when window width is between 768px and 1024px', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 1024px)',
    }));

    const { result } = renderHook(() => useDeviceType());
    window.dispatchEvent(new Event('resize'));
    expect(result.current.deviceType).toBe('tablet');
  });
});
