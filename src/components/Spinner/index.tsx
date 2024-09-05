import React from 'react';
import styles from './Spinner.module.scss';

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer} data-testid='dt_spinner'>
      <div className={styles.spinner} />
    </div>
  );
}
