import apiManager from '@site/src/configs/websocket';
import {
  TSocketResponse,
  TSocketResponseData,
  TSocketSubscribableEndpointNames,
} from '@site/src/configs/websocket/types';
import { useCallback, useState } from 'react';

const useSubscription = <T extends TSocketSubscribableEndpointNames>(name: T) => {
  const [is_loading, setIsLoading] = useState(false);
  const [is_subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<TSocketResponseData<T>>();
  const [full_response, setFullResponse] = useState<TSocketResponse<T>>();
  const [subscriber, setSubscriber] = useState<{ unsubscribe?: VoidFunction }>();

  const onData = useCallback(
    (response: TSocketResponse<T>) => {
      const key = response['msg_type'] ?? name;
      setData(response[key] as TSocketResponseData<T>);
      setFullResponse(response);
      setIsLoading(false);
    },
    [name],
  );

  const onError = useCallback((response: TSocketResponse<T>) => {
    setError(response);
    setIsLoading(false);
    setFullResponse(null);
  }, []);

  const subscribe = useCallback(
    (data: Parameters<typeof apiManager.augmentedSubscribe<T>>[0]) => {
      if (data) {
        setIsLoading(true);
        setSubscribed(true);
        const subscriber_ref = apiManager
          .augmentedSubscribe(data)
          .subscribe({ next: onData, error: onError });
        setSubscriber(subscriber_ref);
        return subscriber_ref;
      }
    },
    [name, onData, onError],
  );

  const unsubscribe = useCallback(() => {
    subscriber?.unsubscribe();
    setSubscribed(false);
  }, [subscriber]);

  return {
    subscribe,
    unsubscribe,
    is_loading,
    is_subscribed,
    error,
    data,
    full_response,
  };
};

export default useSubscription;
