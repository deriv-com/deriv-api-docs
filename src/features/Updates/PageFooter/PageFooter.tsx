import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './PageFooter.module.scss';

export const PageFooter = () => {
  return (
    <footer className={styles.pageFooter}>
      <div className={styles.footerLinks}>
        <Link to='https://developers.deriv.com' className={styles.footerLink}>
          <Translate>New Deriv APIs</Translate>
        </Link>
        <span className={styles.separator}>|</span>
        <Link to='https://deriv.com' className={styles.footerLink}>
          <Translate>Deriv.com</Translate>
        </Link>
        <span className={styles.separator}>|</span>
        <Link to='https://deriv.com/help-centre' className={styles.footerLink}>
          <Translate>Help centre</Translate>
        </Link>
      </div>
    </footer>
  );
};
