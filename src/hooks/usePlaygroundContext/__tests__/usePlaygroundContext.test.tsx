import React, { act, ReactNode } from 'react';
import { RenderHookResult, renderHook } from '@testing-library/react';
import usePlaygroundContext from '..';
import PlaygroundProvider from '@site/src/contexts/playground/playground.provider';
import { IPlaygroundContext } from '@site/src/contexts/playground/playground.context';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';

const wrapper = ({ children }) => <PlaygroundProvider>{children}</PlaygroundProvider>;

describe('usePlaygroundContext', () => {
  let view: RenderHookResult<{ children: ReactNode }, IPlaygroundContext<TSocketEndpointNames>>;

  beforeEach(async () => {
    view = renderHook(() => usePlaygroundContext(), { wrapper });
  });

  it('should be able to dequeue an item of history, when going over the 5 items threshhold', () => {
    act(() => {
      for (let i = 0; i <= 6; i++) {
        view.result.current.setPlaygroundHistory((prev) => [...prev, { testitem: 'test' }]);
      }
    });
    // Initially, the array will be 6 items before the item gets dequeued.
    // This is because we first add an item, then we remove one.
    // We are only able to catch the moment when an item is added, which is why we read 6.
    // Since we set 7 items, one item should've been removed by then, resulting in 6.
    expect(view.result.current.playground_history).toHaveLength(5);
  });

  it('should be able to set history items', () => {
    act(() => {
      view.result.current.setPlaygroundHistory((prev) => [...prev, { testitem: 'test' }]);
    });

    expect(view.result.current.playground_history).toStrictEqual([{ testitem: 'test' }]);
  });
});
