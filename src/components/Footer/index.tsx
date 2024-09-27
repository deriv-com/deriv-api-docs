import React from 'react';
import { Text } from '@deriv/ui';
import { LabelPairedArrowUpRightSmRegularIcon } from '@deriv/quill-icons';
import { Button } from '@deriv/ui';
import { SocialTelegramBlackIcon } from '@deriv/quill-icons';
import { LabelPairedEnvelopeCaptionBoldIcon } from '@deriv/quill-icons';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CustomAccordion from '../CustomAccordion';
import styles from './Footer.module.scss';

import GrayLogo from '../../assets/gray-logo.svg';

const Footer = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const footer_links = React.useMemo(() => {
    const is_en = currentLocale === 'en';
    const get_url = (path: string, isExternal = true) => {
      const pathInfo = `${!is_en ? `/${currentLocale}` : ''}/${path}`;
      return isExternal ? `https://deriv.com${pathInfo}` : pathInfo;
    };
    return {
      root: get_url(''),
      who_we_are: get_url('who-we-are'),
      contact_us: get_url('contact-us'),
      documentation: get_url('docs/intro', false),
      dashboard: get_url('dashboard', false),
      api_explorer: get_url('api-explorer', false),
    };
  }, [currentLocale]);

  const accordionItems = [
    {
      header: 'API',
      content: (
        <ul className={styles.List}>
          <li>
            <a href={footer_links.documentation} className={styles.Link}>
              <Translate>Documentation</Translate>
            </a>
          </li>
          <li>
            <a href={footer_links.dashboard} className={styles.Link}>
              <Translate>Dashboard</Translate>
            </a>
          </li>
          <li>
            <a href={footer_links.api_explorer} className={styles.Link}>
              <Translate>API explorer</Translate>
            </a>
          </li>
          <li>
            <a href='https://tech.deriv.com/' target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Deriv Tech</Translate>
            </a>
          </li>
          <li>
            <a href='https://hackerone.com/deriv?type=team' target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Bug bounty</Translate>
            </a>
          </li>
        </ul>
      ),
    },
    {
      header: 'Deriv.com',
      content: (
        <ul className={styles.List}>
          <li>
            <a href={footer_links.root} target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Homepage</Translate>
            </a>
          </li>
          <li>
            <a href={footer_links.who_we_are} target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Who we are</Translate>
            </a>
          </li>
          <li>
            <a href={footer_links.contact_us} target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Contact us</Translate>
            </a>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <section className={styles.FooterContainer} data-testid='footer-text'>
      <div className={styles.FooterBody}>
        <div className={styles.LogoWrapper}>
          <div className={styles.FooterLogo}>
            <GrayLogo />
          </div>
        </div>
        <div className={styles.FooterSection}>
          <section className={styles.Section1} data-testid='API-section'>
            <Text
              type='subtitle-1'
              as='h3'
              className={styles.SectionTitle}
              data-testid='API-section'
            >
              <Translate>API</Translate>
            </Text>
            <ul className={styles.List}>
              <li>
                <a href={footer_links.documentation} className={styles.Link}>
                  <Translate>Documentation</Translate>
                </a>
              </li>
              <li>
                <a href={footer_links.dashboard} className={styles.Link}>
                  <Translate>Dashboard</Translate>
                </a>
              </li>
              <li>
                <a href={footer_links.api_explorer} className={styles.Link}>
                  <Translate>API explorer</Translate>
                </a>
              </li>
              <li>
                <a href='https://tech.deriv.com/' target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Deriv Tech</Translate>
                </a>
              </li>
              <li>
                <a
                  href='https://hackerone.com/deriv?type=team'
                  target='blank'
                  className={styles.Link}
                >
                  <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Bug bounty</Translate>
                </a>
              </li>
            </ul>
          </section>
          <section className={styles.Section1}>
            <Text type='subtitle-1' as='h3' className={styles.SectionTitle}>
              <Translate>Deriv.com</Translate>
            </Text>
            <ul className={styles.List}>
              <li>
                <a href={footer_links.root} target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Homepage</Translate>
                </a>
              </li>
              <li>
                <a href={footer_links.who_we_are} target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Who we are</Translate>
                </a>
              </li>
              <li>
                <a href={footer_links.contact_us} target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> <Translate>Contact us</Translate>
                </a>
              </li>
            </ul>
          </section>
          <div className={styles.MobileAccordion}>
            <CustomAccordion items={accordionItems} />
          </div>
          <div className={styles.Box} data-testid='get-connected'>
            <Text type='subtitle-1' as='h3' className={styles.SectionTitle}>
              <Translate>Get connected</Translate>
            </Text>
            <p className={styles.SectionContent}>
              <Translate>Discuss ideas and share solutions with developers worldwide.</Translate>
            </p>
            <div className={styles.CommunityButton} data-testid='community-button'>
              <Button
                color='secondary'
                size='md'
                rounded='md'
                type='button'
                variant='outlined'
                className={styles.PaddedButton}
                onClick={() => {
                  window.open('https://deriv.vanillacommunity.com/', '_blank');
                }}
              >
                <Translate>Join our community</Translate>
              </Button>
              <Button
                color='secondary'
                size='md'
                rounded='md'
                type='button'
                variant='outlined'
                className={styles.PaddedButton}
                onClick={() => {
                  window.open('https://t.me/+g6FV5tFY1u9lZGE1', '_blank');
                }}
              >
                <SocialTelegramBlackIcon fill='#000000' iconSize='xs' />
                <Translate>Telegram</Translate>
              </Button>
            </div>
          </div>
          <div className={styles.Box}>
            <Text type='subtitle-1' as='h3' className={styles.SectionTitle}>
              <Translate>We&apos;re here to help</Translate>
            </Text>
            <p className={styles.SectionContent}>
              <Translate>Email us at</Translate>{' '}
              <a href={'mailto:api-support@deriv.com'}>
                <Translate>api-support@deriv.com</Translate>
              </a>{' '}
              <Translate>if you need any assistance or support.</Translate>
            </p>
            <div className={styles.EmailButton}>
              <Button
                color='secondary'
                size='md'
                rounded='md'
                type='button'
                variant='outlined'
                className={`${styles.PaddedButton} ${styles.FullWidthButton}`}
                onClick={() => {
                  window.open('mailto:api-support@deriv.com', '_blank');
                }}
              >
                <LabelPairedEnvelopeCaptionBoldIcon /> <Translate>Send an email</Translate>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
