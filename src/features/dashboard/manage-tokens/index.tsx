import React from 'react';
import { Heading } from '@deriv-com/quill-ui';
import styles from './manage-tokens.module.scss';
import ApiTokenForm from '../components/ApiTokenForm/api-token.form';
import ApiTokenTable from '../components/ApiTokenTable';

const ApiToken = () => {
  return (
    <section className={styles.manage_tokens}>
      <Heading.H2>API Token Manager</Heading.H2>
      <ApiTokenForm />
      <ApiTokenTable />
    </section>
  );
};

export default ApiToken;
