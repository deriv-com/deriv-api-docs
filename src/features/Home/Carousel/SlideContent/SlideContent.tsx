import React from 'react';
import { Text } from '@deriv/ui';
import styles from './SlideContent.module.scss';

type TSlideContent = {
  name: React.ReactNode;
  name_info: React.ReactNode;
  content: React.ReactNode;
};

export const SlideContent = ({ name, name_info, content }: TSlideContent) => (
  <React.Fragment>
    <blockquote className={styles.sliderContent}>
      <Text as='span' type='paragraph-1'>
        {content}
      </Text>
    </blockquote>
    <p className='blockquote-author'>
      <Text as='span' type='paragraph-1'>
        <b>{name}</b>, {name_info}
      </Text>
    </p>
  </React.Fragment>
);
