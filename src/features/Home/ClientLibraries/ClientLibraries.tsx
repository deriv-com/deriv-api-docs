import React from 'react';
import { Text } from '@deriv/ui';
import styles from './ClientLibraries.module.scss';

export const ClientLibraries = () => {
  return (
    <article className={styles.ClientLibrary} data-testid='client-header'>
      <section>
        <figure className={styles.IconJS}>
          <img src='/img/js-library.svg' />
        </figure>
        <Text
          type='heading-2'
          as={'h2'}
          bold
          align='center'
          aria-level={1}
          className={styles.Heading}
        >
          Comprehensive all-in-one <br /> client library
        </Text>
        <p className={styles.SubText}>
          Simplify your development processes and get your app up and running <br />
          faster with the client library of your choice.
        </p>
        <nav className={styles.LibraryLogo}>
          <div className={styles.LogoAndLink}>
            <a
              className={styles.LibraryGoTo}
              href='https://deriv-com.github.io/deriv-api/'
              rel='noreferrer'
              target='_blank'
            >
              <img src='/img/js.svg'></img>
              <label>Go to the JavaScript library</label>
              <img className={styles.LibraryChevron} src='/img/library-chevron.svg' />
            </a>
          </div>
          <div className={styles.LogoAndLink}>
            <a
              className={styles.LibraryGoTo}
              href='https://binary-com.github.io/python-deriv-api/'
              rel='noreferrer'
              target='_blank'
            >
              <img src='/img/py.svg'></img>
              <label>Go to the Python library</label>
              <img className={styles.LibraryChevron} src='/img/library-chevron.svg' />
            </a>
          </div>
          <div className={styles.LogoAndLink}>
            <a
              className={styles.LibraryGoTo}
              href='https://github.com/deriv-com/flutter-deriv-api'
              rel='noreferrer'
              target='_blank'
            >
              <img src='/img/flutter.svg'></img>
              <label>Go to the Flutter library</label>
              <img className={styles.LibraryChevron} src='/img/library-chevron.svg' />
            </a>
          </div>
        </nav>
      </section>
    </article>
  );
};
