import React from 'react';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import styles from '../styles.module.scss';
import Translate from '@docusaurus/Translate';
import useDeviceType from '@site/src/hooks/useDeviceType';

const About = () => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';

  return (
    <div data-testid='about_section' className={styles.aboutContainer}>
      <div
        className={`container ${styles.spaceEvenContent} ${styles.aboutContent} ${styles.gap4} ${styles.mh5}`}
      >
        <div>
          <Heading.H2>
            <Translate>Start building with Deriv</Translate>
          </Heading.H2>
          <Text>
            <Translate>
              Trusted by 2.5 million traders, Deriv supports developers with robust APIs to create
              impactful trading solutions.
            </Translate>
          </Text>
        </div>
        <Button
          variant='primary'
          size='lg'
          fullWidth={isMobile}
          onClick={() => location.assign('https://deriv.com/signup/')}
        >
          <Translate>Sign up</Translate>
        </Button>
      </div>
    </div>
  );
};

export default About;
