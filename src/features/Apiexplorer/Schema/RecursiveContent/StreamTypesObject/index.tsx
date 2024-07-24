import React, { Suspense } from 'react';
import StreamTypesHeader from './StreamTypesHeader';
import StreamTypesBody from './StreamTypesBody';
import SourceButton from '../../SourceButton/SourceButton';
import { TEnumStreamType } from '@site/src/types';
import styles from '../../Schema.module.scss';

type TStreamTypesObject = {
  definitions: {
    stream_types: {
      description: string;
      type: string;
      enum: TEnumStreamType;
    };
  };
};

const ReactJson = React.lazy(() =>
  import('@textea/json-viewer').then((module) => ({ default: module.JsonViewer })),
);

const StreamTypesObject = ({ definitions }: TStreamTypesObject) => {
  const [is_code_open, setIsCodeOpen] = React.useState(false);
  let data = '';
  try {
    data = JSON.stringify(definitions.stream_types, null, 2);
  } catch (error) {
    data = '';
    console.error('There was an issue stringifying JSON data: ', error);
  }
  return (
    <div className={styles.streamTypesContainer} data-testid='dt_stream_types_object'>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      <StreamTypesHeader description={definitions.stream_types.description} />
      {is_code_open ? (
        <React.Fragment>
          <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
            <ReactJson value={JSON.parse(data)} theme='dark' displayDataTypes />
          </Suspense>
        </React.Fragment>
      ) : (
        <StreamTypesBody
          type={definitions.stream_types.type}
          _enum={definitions.stream_types.enum}
        />
      )}
    </div>
  );
};

export default StreamTypesObject;
