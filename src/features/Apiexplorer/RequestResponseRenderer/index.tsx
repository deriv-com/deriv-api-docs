import React, { useState, useCallback } from 'react';
import { TSocketEndpointNames, TSocketRequestProps } from '@site/src/configs/websocket/types';
import { Button } from '@deriv/ui';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useDisableSendRequest from '@site/src/hooks/useDisableSendRequest';
import PlaygroundSection from './PlaygroundSection';
import LoginDialog from '../LoginDialog';
import styles from '../RequestJSONBox/RequestJSONBox.module.scss';
import { ValidDialog } from '../ValidDialog';
import Translate from '@docusaurus/Translate';

export interface IResponseRendererProps<T extends TSocketEndpointNames> {
  name: T;
  reqData?: string;
  auth: number;
}

function RequestResponseRenderer<T extends TSocketEndpointNames>({
  name,
  reqData,
  auth,
}: IResponseRendererProps<T>) {
  const AUTH_ENABLED = 1;
  const { is_logged_in } = useAuthContext();
  const { disableSendRequest } = useDisableSendRequest();
  const { full_response, is_loading, send, clear, error } = useWS<T>(name);
  const [toggle_modal, setToggleModal] = useState(false);
  const [response_state, setResponseState] = useState(false);
  const [is_not_valid, setIsNotValid] = useState(false);

  const parseRequestJSON = () => {
    let request_data: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>;

    try {
      request_data = JSON.parse(reqData);
    } catch (error) {
      setIsNotValid(true);
      setToggleModal(false);
    }

    return request_data;
  };

  const handleClick = useCallback(() => {
    if (auth === AUTH_ENABLED) setToggleModal(true);
    clear();
    send(parseRequestJSON());
    setResponseState(true);
  }, [reqData, send, clear, auth]);

  const handleClear = () => {
    clear();
    setToggleModal(false);
    setResponseState(false);
  };

  return (
    <div>
      <div className={styles.btnWrapper}>
        <Button
          color='primary'
          disabled={disableSendRequest(auth) || reqData === ''}
          onClick={handleClick}
        >
          <Translate>Send Request</Translate>
        </Button>
        <Button color='secondary' disabled={reqData === ''} onClick={handleClear}>
          <Translate>Clear</Translate>
        </Button>
      </div>
      {!is_not_valid ? (
        !is_logged_in && toggle_modal ? (
          <LoginDialog setToggleModal={setToggleModal} />
        ) : (
          <PlaygroundSection
            loader={is_loading}
            response_state={response_state}
            full_response={full_response}
            error={error}
          />
        )
      ) : (
        <ValidDialog setIsNotValid={setIsNotValid} setToggleModal={setToggleModal} />
      )}
    </div>
  );
}

export default RequestResponseRenderer;
