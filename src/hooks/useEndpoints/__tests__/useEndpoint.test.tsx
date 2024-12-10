import React from 'react';
import { renderHook, cleanup, waitFor } from '@testing-library/react';
import useEndpoints from '..';

const mockYamlContent = `
groups:
  - label: All Calls
    methods:
      - name: account_list
        title: Account List
      - name: active_symbols
        title: Active Symbols
`;

jest.mock('yaml', () => ({
  parse: jest.fn(() => ({
    groups: [
      {
        label: 'Group 1',
        methods: [
          { name: 'account_list', title: 'Account List' },
          { name: 'active_symbols', title: 'Active Symbols' },
        ],
      },
    ],
  })),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(mockYamlContent),
  }),
) as jest.Mock;

describe('useEndpoint', () => {
  const { result } = renderHook(() => useEndpoints());

  const mockMethods = [
    { name: 'account_list', title: 'Account List' },
    { name: 'active_symbols', title: 'Active Symbols' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should populate endpoints', async () => {
    await waitFor(() => {
      expect(result.current.playground_request).toEqual(mockMethods);
    });
  });
});
