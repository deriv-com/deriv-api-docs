import { renderHook, cleanup } from '@testing-library/react';
import useLoginUrl from '..';
import * as utils from '@site/src/utils';
import { act } from 'react';

jest
  .spyOn(utils, 'getServerConfig')
  .mockReturnValue({ appId: '1234', serverUrl: 'test.binary.sx', oauth: 'test.oauth.sx' });

jest.mock('@docusaurus/router', () => ({
  useLocation: jest.fn(),
}));

describe('Use Login URL', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Should return login url for english language by default ', () => {
    const { result } = renderHook(() => useLoginUrl());

    let loginUrl: string;
    act(() => {
      loginUrl = result.current.getUrl();
    });

    expect(loginUrl).toContain('l=en');
    expect(utils.getServerConfig).toHaveBeenCalled();
    expect(loginUrl).toMatch('https://test.oauth.sx/oauth2/authorize?app_id=1234&l=en');
    expect(loginUrl).toMatch(/app_id=1234/);
  });

  it('Should return login url for spanish language correctly', () => {
    const { result } = renderHook(() => useLoginUrl());

    let loginUrl: string;
    act(() => {
      loginUrl = result.current.getUrl('es');
    });

    expect(loginUrl).toContain('l=es');
    expect(utils.getServerConfig).toHaveBeenCalled();
    expect(loginUrl).toMatch('https://test.oauth.sx/oauth2/authorize?app_id=1234&l=es');
    expect(loginUrl).toMatch(/app_id=1234/);
  });
});
