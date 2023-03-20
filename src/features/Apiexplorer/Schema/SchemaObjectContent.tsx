import React, { useState } from 'react';
import RecursiveProperties from './RecursiveProperties';
import SchemaDescription from './SchemaDescription';
import styles from './Schema.module.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SourceButton from './SourceButton';
import SchemaBodyHeader from './SchemaBodyHeader';

type TSchemaObjectContent = {
  key_value: string;
  properties: any;
};

export default function SchemaObjectContent({ key_value, properties }: TSchemaObjectContent) {
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
  } = properties[key_value];
  const value = properties[key_value];
  let data;
  try {
    data = JSON.stringify(value, null, 2);
  } catch (_error) {
    data = '';
  }
  React.useEffect(() => {
    setIsCodeOpen(false);
    setIsOpenObject(false);
  }, [properties]);
  return (
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
      />
      {/* Description */}
      <SchemaDescription description={description} />
      {/* RecursiveProperties */}
      {is_code_open && (
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
            const ReactJson = require('react-json-view').default;
            return <ReactJson src={JSON.parse(data)} theme='tube' />;
          }}
        </BrowserOnly>
      )}
      {!is_code_open && (
        <RecursiveProperties
          is_open={is_open_object}
          properties={value.properties || value?.items?.properties}
          value={value}
        />
      )}
    </div>
  );
}
