import React, { Suspense, useState } from 'react';
import RecursiveProperties from '../RecursiveProperties';
import SchemaDescription from '../SchemaDescription';
import SourceButton from '../../SourceButton/SourceButton';
import SchemaBodyHeader from '../SchemaBodyHeader';
import styles from '../../Schema.module.scss';

const ReactJson = React.lazy(() =>
  import('@textea/json-viewer').then((module) => ({ default: module.JsonViewer })),
);

type TSchemaObjectContent = {
  key_value: string;
  properties: any;
  jsonSchema?: any;
  is_stream_types?: boolean;
};

export default function SchemaObjectContent({
  key_value,
  properties,
  jsonSchema,
  is_stream_types = false,
}: TSchemaObjectContent) {
  const [is_open_object, setIsOpenObject] = useState<boolean>(false);
  const [is_code_open, setIsCodeOpen] = useState<boolean>(false);
  const {
    type,
    description,
    default: defaultValue,
    pattern,
    examples,
    enum: _enum,
    title,
    items,
  } = properties[key_value];
  const value = properties[key_value];
  let data;
  try {
    data = JSON.stringify(value, null, 2);
  } catch (error) {
    data = '';
    console.error('There was an issue stringifying JSON data: ', error);
  }
  React.useEffect(() => {
    setIsCodeOpen(false);
    setIsOpenObject(false);
  }, [properties]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.schemaBodySignature}>
        <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
        {/* Header */}
        <SchemaBodyHeader
          key_value={key_value}
          type={type}
          defaultValue={defaultValue}
          pattern={pattern}
          examples={examples}
          enum={_enum}
          title={title}
          is_open_object={is_open_object}
          setIsOpenObject={setIsOpenObject}
          is_stream_types={is_stream_types}
          items_type={items?.type}
        />
        {/* Description */}
        <SchemaDescription description={description} />
        {/* RecursiveProperties */}

        {is_code_open && (
          <div className={styles.reactJsonView}>
            <ReactJson value={JSON.parse(data)} theme='dark' displayDataTypes />
          </div>
        )}

        {!is_code_open && (
          <RecursiveProperties
            is_open={is_open_object}
            properties={value.properties || value?.items?.properties || value?.patternProperties}
            value={value}
            jsonSchema={jsonSchema}
          />
        )}
      </div>
    </Suspense>
  );
}
