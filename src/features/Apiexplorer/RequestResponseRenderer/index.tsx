import React, { useState, useCallback, useEffect } from 'react';
import { TSocketEndpointNames, TSocketRequestProps } from '@site/src/configs/websocket/types';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useDisableSendRequest from '@site/src/hooks/useDisableSendRequest';
import PlaygroundSection from './PlaygroundSection';
import LoginDialog from '../LoginDialog';
import styles from '../RequestJSONBox/RequestJSONBox.module.scss';
import { ValidDialog } from '../ValidDialog';
import { translate } from '@docusaurus/Translate';
import { Button } from '@deriv-com/quill-ui';
import { hasDuplicateKeys } from '@site/src/utils';

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
  const { full_response, is_loading, send, clear, error, disableApiNameOnRequest } = useWS<T>(name);
  const [toggle_modal, setToggleModal] = useState(false);
  const [response_state, setResponseState] = useState(false);
  const [is_not_valid, setIsNotValid] = useState(false);

  useEffect(() => {
    disableApiNameOnRequest();
  }, []);

  const setInvalidJson = () => {
    setIsNotValid(true);
    setToggleModal(false);
  };

  const parseRequestJSON = () => {
    let request_data: TSocketRequestProps<T> extends never ? undefined : TSocketRequestProps<T>;

    try {
      if (hasDuplicateKeys(reqData)) {
        setInvalidJson();
        return;
      }
      request_data = JSON.parse(reqData);
      return request_data;
    } catch (error) {
      setInvalidJson();
      return;
    }
  };

  const handleClick = useCallback(() => {
    if (!is_logged_in && auth == AUTH_ENABLED) {
      setToggleModal(true);
      return;
    }
    const request_data = parseRequestJSON();
    if (request_data) {
      clear();
      send(request_data);
      setResponseState(true);
    }
  }, [reqData, send, clear, auth, is_logged_in]);

  const handleClear = () => {
    clear();
    setToggleModal(false);
    setResponseState(false);
  };

  return (
    <div>
      <div className={styles.btnWrapper}>
        <Button
          data-testid='send-request'
          variant='primary'
          color='coral'
          disabled={disableSendRequest(auth) || reqData === '' || is_loading}
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
      {!is_not_valid ? (
        toggle_modal ? (
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
