import React from 'react';
import styles from './HomePageSkeleton.module.scss';
import useDeviceType from '@site/src/hooks/useDeviceType';

const HomePageSkeleton: React.FC = () => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  return (
    <div className={styles['skeleton-container']}>
      {/* Navigation Bar Skeleton */}
      <nav
        className={`${styles['skeleton-navbar']} ${
          isMobile ? styles['skeleton-navbar-mobile'] : ''
        }`}
      >
        {isMobile ? (
          // Mobile navigation layout - 1 on left, 2 on right
          <>
            <div className={`${styles['skeleton-logo']} ${styles['skeleton-box']}`}></div>
            <div className={styles['skeleton-nav-buttons']}>
              <div className={`${styles['skeleton-btn']} ${styles['skeleton-box']}`}></div>
              <div className={`${styles['skeleton-btn']} ${styles['skeleton-box']}`}></div>
            </div>
          </>
        ) : (
          // Desktop navigation layout
          <>
            <div className={`${styles['skeleton-logo']} ${styles['skeleton-box']}`}></div>
            <ul className={styles['skeleton-nav-links']}>
              <li className={`${styles['skeleton-nav-link']} ${styles['skeleton-box']}`}></li>
              <li className={`${styles['skeleton-nav-link']} ${styles['skeleton-box']}`}></li>
              <li className={`${styles['skeleton-nav-link']} ${styles['skeleton-box']}`}></li>
              <li className={`${styles['skeleton-nav-link']} ${styles['skeleton-box']}`}></li>
            </ul>
            <div className={styles['skeleton-nav-buttons']}>
              <div className={`${styles['skeleton-btn']} ${styles['skeleton-box']}`}></div>
              <div className={`${styles['skeleton-btn']} ${styles['skeleton-box']}`}></div>
              <div className={`${styles['skeleton-language']} ${styles['skeleton-box']}`}></div>
            </div>
          </>
        )}
      </nav>

      {/* Features Section Skeleton */}
      <section className={styles['skeleton-features']}>
        <div className={styles['skeleton-features-content']}>
          <div className={`${styles['skeleton-features-title']} ${styles['skeleton-box']}`}></div>
        </div>
      </section>
    </div>
  );
};

export default HomePageSkeleton;
