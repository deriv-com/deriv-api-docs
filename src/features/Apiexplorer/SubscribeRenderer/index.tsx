import React, { useState, useCallback, useEffect } from 'react';
import {
  TSocketSubscribableEndpointNames,
  TSocketRequestProps,
} from '@site/src/configs/websocket/types';
import { Button } from '@deriv-com/quill-ui';
import styles from '../RequestJSONBox/RequestJSONBox.module.scss';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useSubscription from '@site/src/hooks/useSubscription';
import useDisableSendRequest from '@site/src/hooks/useDisableSendRequest';
import PlaygroundSection from '../RequestResponseRenderer/PlaygroundSection';
import LoginDialog from '../LoginDialog';
import ValidDialog from '../ValidDialog';
import { translate } from '@docusaurus/Translate';

export interface IResponseRendererProps<T extends TSocketSubscribableEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

function SubscribeRenderer<T extends TSocketSubscribableEndpointNames>({
  name,
  reqData,
  auth,
}: IResponseRendererProps<T>) {
  const { is_logged_in, is_switching_account } = useAuthContext();
  const { disableSendRequest } = useDisableSendRequest();
  const { full_response, is_loading, subscribe, unsubscribe, is_subscribed, error } =
    useSubscription<T>(name);
  const [response_state, setResponseState] = useState(false);
  const [toggle_modal, setToggleModal] = useState(false);
  const [is_not_valid, setIsNotValid] = useState(false);

  useEffect(() => {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'AuthorizationRequired'
    ) {
      setToggleModal(true);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      if (is_subscribed) unsubscribe();
    };
  }, [is_subscribed, unsubscribe]);

  useEffect(() => {
    if (is_switching_account) unsubscribe();
  }, [is_switching_account, unsubscribe]);

  const parseRequestJSON = useCallback(() => {
    let request_data: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>;

    try {
      request_data = JSON.parse(reqData);
    } catch (error) {
      setIsNotValid(true);
      setToggleModal(false);
    }

    return request_data;
  }, [reqData]);

  const handleClick = useCallback(() => {
    if (is_subscribed) unsubscribe();
    subscribe(parseRequestJSON());
    setResponseState(true);
  }, [parseRequestJSON, subscribe]);

  const handleClear = () => {
    unsubscribe();
    setResponseState(false);
  };

  return (
    <div>
      <div className={styles.btnWrapper}>
        <Button
          data-testid='send-request'
          variant='primary'
          color='coral'
          disabled={disableSendRequest(auth) || reqData === ''}
          onClick={handleClick}
          label={translate({ message: 'Send request' })}
        />
        <Button
          data-testid='clear-request'
          variant='secondary'
          color='black'
          disabled={!response_state}
          onClick={handleClear}
          label={translate({ message: 'Clear response' })}
        />
      </div>
      {is_not_valid && (
        <ValidDialog setIsNotValid={setIsNotValid} setToggleModal={setToggleModal} />
      )}
      {!is_logged_in && auth == 1 && toggle_modal && (
        <LoginDialog setToggleModal={setToggleModal} />
      )}
      <PlaygroundSection
        loader={is_loading}
        response_state={response_state}
        full_response={full_response}
        error={error}
      />
    </div>
  );
}

export default React.memo(SubscribeRenderer);
