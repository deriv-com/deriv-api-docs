import React from 'react';
import { Text } from '@deriv/ui';
import styles from './ClientLibraries.module.scss';
import Translate from '@docusaurus/Translate';

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
          <Translate>Comprehensive all-in-one</Translate>
          <br /> <Translate>client library</Translate>
        </Text>
        <p className={styles.SubText}>
          <Translate>Simplify your development processes and get your app up and running</Translate>
          <br />
          <Translate> faster with the client library of your choice.</Translate>
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
              <label>
                <Translate>Go to the JavaScript library</Translate>
              </label>
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
              <label>
                <Translate>Go to the Python library</Translate>
              </label>
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
              <label>
                <Translate>Go to the Flutter library</Translate>
              </label>
              <img className={styles.LibraryChevron} src='/img/library-chevron.svg' />
            </a>
          </div>
        </nav>
      </section>
    </article>
  );
};
