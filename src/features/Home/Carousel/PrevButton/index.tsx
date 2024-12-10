import React from 'react';
import { useSwiper } from 'swiper/react';
import styles from './PrevButton.module.scss';

const PrevButton = () => {
  const swiper = useSwiper();
  return (
    <div
      className={`${styles.prev} ${styles.control}`}
      onClick={() => swiper.slidePrev()}
      data-testid='carousel-arrow-prev'
    />
  );
};

export default PrevButton;
