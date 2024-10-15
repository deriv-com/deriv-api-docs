import React from 'react';
import styles from './RestrictionsAppname.module.scss';
import Translate from '@docusaurus/Translate';

const RestrictionsAppname = () => {
  return (
    <ul className={styles.restrictions}>
      <li>
        <Translate>Only alphanumeric characters with spaces and underscores are allowed.</Translate>
      </li>
      <li>
        <Translate>The name can contain up to 48 characters.</Translate>
      </li>
      <li>
        <Translate>Duplicate token names aren’t allowed.</Translate>
      </li>
      <li>
        <Translate>The name cannot contain “Binary”, “Deriv”, or similar words.</Translate>
      </li>
    </ul>
  );
};

export default RestrictionsAppname;
