import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import Translate, { translate } from '@docusaurus/Translate';
import styles from '../styles.module.scss';
import clsx from 'clsx';
import useDeviceType from '@site/src/hooks/useDeviceType';

type TBenefitsContext = {
  icon: string;
  text: string;
  alt: string;
  description: string;
};

const BenefitsContext = ({ icon, text, alt, description }: TBenefitsContext) => {
  return (
    <div className={`${styles.flexColumn} ${styles.spaceEvenContent} ${styles.pv5} ${styles.benefitContext}`}>
      <img className={''} data-testid={`dt_${icon}_icon`} src={`/img/${icon}.svg`} alt={alt} />
      <Heading.H4 centered>{text}</Heading.H4>
      <Text centered>{description}</Text>
    </div>
  );
};

const Benefits = () => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';

  return (
    <div
      data-testid='benefits_section'
      className={`${styles.mh5} ${clsx({
        ['container']: !isMobile,
        [styles.benefitContent]: !isMobile,
      })}`}
    >
      <Heading.H2 centered>
        <Translate>Benefits of Deriv API</Translate>
      </Heading.H2>
      <div
        className={`${styles.spaceEvenContent} ${styles.mh5} ${clsx({
          [styles.benefitContainerMbl]: isMobile,
        })}`}
      >
        <BenefitsContext
          icon='customization'
          text={translate({
            message: 'Customisation',
          })}
          alt='customisation'
          description={translate({
            message: `Create a trading platform that’s uniquely yours by leveraging features and specs from Deriv’s platforms with our APIs.`,
          })}
        />
        <BenefitsContext
          icon='easy-integration'
          text={translate({
            message: 'Easy integration',
          })}
          alt='easy-integration'
          description={translate({
            message: `Quickly connect to your existing tech stack and start trading with minimal setup.`,
          })}
        />
        <BenefitsContext
          icon='fast-execution'
          text={translate({
            message: 'Fast execution',
          })}
          alt='fast-execution'
          description={translate({
            message: `Experience high-speed data updates and execute trades with near-zero latency.`,
          })}
        />
      </div>
    </div>
  );
};

export default Benefits;
