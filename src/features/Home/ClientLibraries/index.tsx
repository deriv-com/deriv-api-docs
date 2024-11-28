import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import styles from '../styles.module.scss';
import Translate from '@docusaurus/Translate';

const ClientLibraries = () => {
  return (
    <div data-testid='client_section'>
      <Heading.H2 centered>
        <Translate>All-in-one support for every developer</Translate>
      </Heading.H2>
      <Text centered>
        <Translate>Supports JavaScript, Python, and Flutter for ultimate compatibility.</Translate>
      </Text>
      <div
        className={`${styles.spaceEvenContent} ${styles.justifyCenter} ${styles.gap4} ${styles.mh3} ${styles.client_libraries}`}
      >
        <a
          className={styles.LibraryGoTo}
          href='https://deriv-com.github.io/deriv-api/'
          rel='noreferrer'
          target='_blank'
        >
          <img src='/img/js.svg' width={60}></img>
        </a>
        <a
          className={styles.LibraryGoTo}
          href='https://deriv-com.github.io/python-deriv-api/'
          rel='noreferrer'
          target='_blank'
        >
          <img src='/img/py.svg' width={60}></img>
        </a>
        <a
          className={styles.LibraryGoTo}
          href='https://github.com/deriv-com/flutter-deriv-api'
          rel='noreferrer'
          target='_blank'
        >
          <img src='/img/flutter.svg' width={60}></img>
        </a>
      </div>
    </div>
  );
};

export default ClientLibraries;
