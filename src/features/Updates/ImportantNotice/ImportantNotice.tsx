import React from 'react';
import Translate from '@docusaurus/Translate';
import { StandaloneCircleInfoBoldIcon } from '@deriv/quill-icons';
import styles from './ImportantNotice.module.scss';

export const ImportantNotice = () => {
  return (
    <section className={styles.noticeSection}>
      <div className={styles.noticeCard}>
        <div className={styles.noticeHeader}>
          <StandaloneCircleInfoBoldIcon iconSize='md' className={styles.noticeIcon} />
          <h4 className={styles.noticeTitle}>
            <Translate>Important notice for existing developers</Translate>
          </h4>
        </div>
        <p className={styles.noticeBody}>
          <Translate>
            Your existing apps and integrations will continue to work on this legacy platform. You
            do not need to migrate immediately — your current setup remains functional.
          </Translate>
        </p>
        <p className={styles.noticeBold}>
          <Translate>
            However, to access the new Deriv APIs, you will need to create a new account on
            developers.deriv.com. Your existing legacy credentials will not work there.
          </Translate>
        </p>
        <p className={styles.noticeSmall}>
          <Translate>New users and traders do not need to take any action.</Translate>
        </p>
      </div>
    </section>
  );
};
