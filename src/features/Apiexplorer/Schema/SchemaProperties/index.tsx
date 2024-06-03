import React, { Suspense } from 'react';
import { TJsonSchemaType } from '../SchemaBody';
import SourceButton from '../SourceButton/SourceButton';
import RecursiveProperties from '../RecursiveContent/RecursiveProperties';

const ReactJson = React.lazy(() =>
  import('@textea/json-viewer').then((module) => ({ default: module.JsonViewer })),
);

const SchemaProperties = ({ jsonSchema }: TJsonSchemaType) => {
  React.useEffect(() => {
    setIsCodeOpen(false);
  }, [jsonSchema]);
  const [is_code_open, setIsCodeOpen] = React.useState(false);
  let data = '';
  try {
    data = JSON.stringify(jsonSchema.default, null, 2);
  } catch (error) {
    data = '';
    console.error('There was an issue stringifying JSON data: ', error);
  }

  return (
    <React.Fragment>
      <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
      {is_code_open ? (
        <React.Fragment>
          <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
            <ReactJson value={JSON.parse(data)} theme='dark' displayDataTypes />
          </Suspense>
        </React.Fragment>
      ) : (
        <RecursiveProperties
          is_open
          properties={jsonSchema.properties}
          value={jsonSchema.properties}
          jsonSchema={jsonSchema}
        />
      )}
    </React.Fragment>
  );
};

export default SchemaProperties;
