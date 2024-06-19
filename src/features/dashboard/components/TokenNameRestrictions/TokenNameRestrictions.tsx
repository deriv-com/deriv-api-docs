import React from 'react';
import styles from './TokenNameRestrictions.module.scss';
import Translate, { translate } from '@docusaurus/Translate';

const TokenNameRestrictions = () => {
  return (
    <ul className={styles.tokenrestrictions}>
      <li>
        <Translate>Only alphanumeric characters with spaces and underscores are allowed</Translate>
      </li>
      <li>
        <Translate>Only 2-32 characters are allowed</Translate>
      </li>
      <li>
        <Translate>No duplicate token names are allowed for the same account.</Translate>
      </li>
      <li>
        {translate({
          message:
            'No keywords "deriv" or "binary" or words that look similar, e.g. "_binary_" or "d3eriv" are allowed.',
        })}
      </li>
    </ul>
  );
};

export default TokenNameRestrictions;
