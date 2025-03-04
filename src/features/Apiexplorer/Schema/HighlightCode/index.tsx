import React from 'react';
import clsx from 'clsx';
import { SchemaDescriptionTypes } from '../RecursiveContent/SchemaDescription';
import styles from './HighlightCode.module.scss';
import useEndpoints from '@site/src/hooks/useEndpoints';

export const HighlightCode = ({ description }: SchemaDescriptionTypes) => {
  const { playground_request } = useEndpoints();

  if (!description) return null;

  const [first, code, ...rest] = description.split('`');

  const has_api_call = playground_request.some((el) => el.name === code);

  return (
    <React.Fragment>
      {first}
      {code && (
        <span className={clsx(styles.schemaRole, styles.schemaCode)}>
          {has_api_call ? (
            <a
              href={`#${code}`}
              onClick={() => window.scrollTo(0, 0)}
              className={styles.schemaLink}
            >
              {code}
            </a>
          ) : (
            code
          )}
        </span>
      )}
      {rest.length > 0 && <HighlightCode description={rest.join('`')} />}
    </React.Fragment>
  );
};
