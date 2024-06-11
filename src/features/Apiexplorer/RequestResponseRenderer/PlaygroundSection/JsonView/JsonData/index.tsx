import React from 'react';
import styles from './JsonData.module.scss';
import {
  TSocketEndpointNames,
  TSocketSubscribableEndpointNames,
  TSocketResponse,
} from '@site/src/configs/websocket/types';
import { JsonViewer } from '@textea/json-viewer';

type TJsonData<T extends TSocketEndpointNames> = {
  history_reponse: TSocketResponse<T>;
};

const JsonData = <T extends TSocketEndpointNames | TSocketSubscribableEndpointNames>({
  history_reponse,
}: TJsonData<T>) => {
  return (
    <React.Fragment>
      {history_reponse !== null && history_reponse?.echo_req && (
        <div
          className={styles.reactJsonContainer}
          data-testid={`dt_json_container-${history_reponse.req_id}`}
        >
          <JsonViewer value={history_reponse.echo_req} theme='dark' displayDataTypes />
          <JsonViewer value={history_reponse} theme='dark' displayDataTypes />
        </div>
      )}
    </React.Fragment>
  );
};

export default JsonData;
