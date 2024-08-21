import React from 'react';
import ApiTokenTable from '../components/ApiTokenTable';
import styles from './manage-tokens.module.scss';
const TokenManagePage: React.FC = () => {
  return (
    <div className={styles.manageApps}>
      <ApiTokenTable />
    </div>
  );
};

export default TokenManagePage;
