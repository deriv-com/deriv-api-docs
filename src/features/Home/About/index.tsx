import React from 'react';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import styles from '../styles.module.scss';
import Translate from '@docusaurus/Translate';

const About = () => {
  return (
    <div data-testid='about_section' className={styles.aboutContainer}>
      <div className={`container ${styles.spaceEvenContent} ${styles.aboutContent} ${styles.gap4} ${styles.mh5}`}>
        <div>
          <Heading.H2>
            <Translate>Who we are </Translate>
          </Heading.H2>
          <Text>
            <Translate>
              Join over 2.5 million traders who have chosen Deriv as their trusted broker.
            </Translate>
          </Text>
        </div>
        <Button variant='primary' size='lg'>
          <Translate>Learn More</Translate>
        </Button>
      </div>
    </div>
  );
};

export default About;
