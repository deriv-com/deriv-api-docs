import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  TSocketEndpointNames,
  TSocketSubscribableEndpointNames,
  TSocketResponse,
} from '@site/src/configs/websocket/types';
import Spinner from '@site/src/components/Spinner';
import styles from './PlaygroundSection.module.scss';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import useScrollTo from '@site/src/hooks/useScrollTo';
import JsonView from './JsonView';

type TPlaygroundSection<T extends TSocketEndpointNames> = {
  loader: boolean;
  response_state: boolean;
  full_response: TSocketResponse<T>;
  error: unknown;
};

const PlaygroundSection = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  loader,
  response_state,
  full_response,
  error,
}: TPlaygroundSection<T>) => {
  const { setPlaygroundHistory, playground_history } = usePlaygroundContext();
  const [is_scrolling, setIsScrolling] = useState(true);
  const ref: RefObject<HTMLDivElement> = useRef(null);

  const updateHistory = () => {
    if (!response_state) {
      setPlaygroundHistory([]);
      return;
    }

    if (full_response) {
      setPlaygroundHistory((prev: TSocketResponse<T>[]) => [...prev, full_response]);
    }
    if (error) {
      setPlaygroundHistory((prev: TSocketResponse<T>[]) => [...prev, error]);
    }
  };

  const toggleScrolling = (e) => {
    const SCROLL_MARGIN = 150;
    const scroll_height = e.target.scrollHeight;
    const scroll_top = e.target.scrollTop;
    const scroll_position = scroll_height - scroll_top;
    const window_height = e.target.clientHeight;

    if (window_height + SCROLL_MARGIN < scroll_position) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
    }
  };

  useScrollTo(ref, playground_history, is_scrolling);

  useEffect(() => {
    updateHistory();
  }, [full_response, error, response_state]);

  if (loader && playground_history.length === 0) return <Spinner />;

  return (
    <div
      id='playground-console'
      className={styles.playgroundConsole}
      data-testid='dt_playground_section'
      ref={ref}
      onScroll={toggleScrolling}
    >
      {response_state && (
        <React.Fragment>
          <JsonView />
        </React.Fragment>
      )}
    </div>
  );
};

export default PlaygroundSection;
