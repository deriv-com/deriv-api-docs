import React from 'react';
import styles from '../../Schema.module.scss';
import clsx from 'clsx';

type TSchemaBodyHeader = {
  key_value: string;
  type: string | string[];
  defaultValue: string;
  pattern: string;
  title: string;
  is_open_object: boolean;
  setIsOpenObject: (isOpen: boolean) => void;
  examples: string[] | number;
  enum;
  is_stream_types: boolean;
  items_type?: string;
};

const SchemaBodyHeader = ({
  key_value,
  type,
  defaultValue,
  pattern,
  examples,
  enum: _enum,
  title,
  is_open_object,
  setIsOpenObject,
  is_stream_types,
  items_type,
}: TSchemaBodyHeader) => {
  let typeClassName;
  switch (type) {
    case 'number':
      typeClassName = styles.number;
      break;
    case 'array':
      typeClassName = styles.array;
      break;
    case 'integer':
      typeClassName = styles.integer;
      break;
    default:
      typeClassName = styles.string;
      break;
  }
  if (Array.isArray(type)) {
    type.map((item) => {
      if (item !== 'null') {
        switch (item) {
          case 'number':
            typeClassName = styles.number;
            break;
          case 'array':
            typeClassName = styles.array;
            break;
          case 'integer':
            typeClassName = styles.integer;
            break;
          default:
            typeClassName = styles.string;
            break;
        }
      }
    });
  }

  const is_not_an_object = type && type !== 'object' && typeof type !== 'object';

  const is_type_with_enumlabel = _enum && is_not_an_object;
  const is_only_type = !_enum && is_not_an_object;

  return (
    <div
      className={clsx(styles.schemaBodyHeader, { [styles.schemaObjectHeader]: type === 'object' })}
    >
      <div className={styles.schemaBodyType}>
        <div className={styles.enumFlex}>
          <p style={{ fontSize: '2.6rem' }}>
            <strong>{key_value}</strong>
          </p>
          <div className={styles.enumContainer}>
            {is_type_with_enumlabel && (
              <React.Fragment>
                <span className={styles.enumLabel}>{_enum.length > 1 ? 'enum' : 'constant'}</span>{' '}
                <span className={`${styles.enumType} ${typeClassName}`}>{type}</span>
                <React.Fragment>
                  {_enum.map((el: string, i: number) => (
                    <div className={`${styles.schemaCode} ${styles.schemaEnums}`} key={i}>
                      {el}
                    </div>
                  ))}
                </React.Fragment>
              </React.Fragment>
            )}
            {is_only_type && (
              <span className={clsx(styles.enumType, { [typeClassName]: typeClassName })}>
                {type}
              </span>
            )}

            {type && Array.isArray(type) && (
              <React.Fragment>
                <span className={clsx(styles.enumType, { [typeClassName]: typeClassName })}>
                  {type[0]}, {type[1]}
                </span>
              </React.Fragment>
            )}

            {type === 'object' || type === 'array' ? (
              <React.Fragment>
                <div className={styles.schemaObjectContent}>
                  <div>
                    <button onClick={() => setIsOpenObject(!is_open_object)}>
                      {title ? key_value : items_type ?? 'object'}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <></>
            )}

            {is_stream_types && (
              <div className={styles.schemaObjectContent}>
                <span className={styles.enumLabel}>one of</span>
                <button onClick={() => setIsOpenObject(!is_open_object)}>stream_types</button>
                <span className={`${styles.enumType} ${styles.array}`}>array</span>
              </div>
            )}

            {pattern && (
              <div className={styles.schemaRegexContainer}>
                <div className={styles.schemaBodyPattern}>{pattern}</div>
              </div>
            )}
            {typeof defaultValue !== 'undefined' && (
              <div className={styles.defaultValue}>
                <span className={styles.defaultValueLabel}>default: </span>
                <span className={styles.schemaDefaultValue}>{defaultValue}</span>
              </div>
            )}
            {/* take examples and map it to div elements with class styles.defaultValue */}
            {examples && (
              <div className={styles.defaultValue}>
                <span className={styles.defaultValueLabel}>example: </span>
                {Array.isArray(examples) ? (
                  examples.map((el: string, i: number) => (
                    <div key={i}>
                      <span className={styles.schemaDefaultValue}>{el}</span>
                    </div>
                  ))
                ) : (
                  <span className={styles.schemaDefaultValue}>{examples}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaBodyHeader;
