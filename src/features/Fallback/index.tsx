import React from 'react';
import { Heading } from '@deriv-com/quill-ui';
import styles from './Fallback.module.scss';
import Translate from '@docusaurus/Translate';

export const Fallback = () => {
  return (
    <div>
      <div className={styles.fallbackContainer} data-testid='fallback'>
        <div className={styles.fallbackContent}>
          <Heading.H1>
            <Translate>
              The server is currently unable to handle the request due to a temporary overload or
              maintenance of the server. Please try again later.
            </Translate>
          </Heading.H1>
        </div>
      </div>
    </div>
  );
};
