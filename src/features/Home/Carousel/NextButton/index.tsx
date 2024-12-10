import React from 'react';
import { useSwiper } from 'swiper/react';
import styles from './NextButton.module.scss';

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <div
      className={styles.next}
      onClick={() => swiper.slideNext()}
      data-testid='carousel-arrow-next'
    />
  );
};

export default NextButton;
