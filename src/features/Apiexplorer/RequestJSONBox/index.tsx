import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import React, { useMemo } from 'react';
import RequestResponseRenderer from '../RequestResponseRenderer';
import style from './RequestJSONBox.module.scss';
import SubscribeRenderer from '../SubscribeRenderer';
import { TSocketSubscribableEndpointNames } from '@site/src/configs/websocket/types';
import { translate } from '@docusaurus/Translate';
import { TextArea } from '@deriv-com/quill-ui';

interface TRequestJSONBox<T extends TSocketEndpointNames> {
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  request_example: string;
  name: T;
  auth: number;
}

function RequestJSONBox<T extends TSocketEndpointNames>({
  handleChange,
  request_example,
  name,
  auth,
}: TRequestJSONBox<T>) {
  const is_subscribe = useMemo(() => {
    return request_example?.includes('subscribe');
  }, [request_example]);
  
  return (
    <div className={style.playgroundBox}>
      <div className={style.formContent}>
        <TextArea
          id='playground-request'
          textAreaClassName={style.textareaRequest}
          label={translate({ message: 'Request JSON' })}
          onChange={handleChange}
          value={request_example}
          rows={10}
        />
        {is_subscribe ? (
          <SubscribeRenderer
            name={name as TSocketSubscribableEndpointNames}
            reqData={request_example}
            auth={auth}
          />
        ) : (
          <RequestResponseRenderer name={name} reqData={request_example} auth={auth} />
        )}
      </div>
    </div>
  );
}

export default RequestJSONBox;
