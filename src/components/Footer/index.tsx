import React from 'react';
import CustomAccordion from '../CustomAccordion';
import { Text, Button, Heading } from '@deriv-com/quill-ui';
import {
  LabelPairedArrowUpRightSmRegularIcon,
  SocialTelegramBlackIcon,
  LabelPairedEnvelopeMdBoldIcon,
} from '@deriv/quill-icons';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
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
            <a
              href='https://deriv.com/derivtech'
              target='_blank'
              className={styles.Link}
              rel='noreferrer'
            >
              <Translate>Deriv Tech</Translate> <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
          <li>
            <a
              href='https://hackerone.com/deriv?type=team'
              target='_blank'
              className={styles.Link}
              rel='noreferrer'
            >
              <Translate>Bug bounty</Translate> <LabelPairedArrowUpRightSmRegularIcon />
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
            <a href={footer_links.root} target='_blank' className={styles.Link} rel='noreferrer'>
              <Translate>Homepage</Translate> <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
          <li>
            <a
              href={footer_links.who_we_are}
              target='_blank'
              className={styles.Link}
              rel='noreferrer'
            >
              <Translate>Who we are</Translate> <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
          <li>
            <a
              href={footer_links.contact_us}
              target='_blank'
              className={styles.Link}
              rel='noreferrer'
            >
              <Translate>Contact us</Translate> <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div className='container'>
    <section className={styles.FooterContainer} data-testid='footer-text'>
      <div className={styles.FooterBody}>
        <div className={styles.LogoWrapper}>
          <div className={styles.FooterLogo}>
            <GrayLogo />
          </div>
        </div>
        <div className={styles.FooterSection}>
          <section className={styles.Section1} data-testid='API-section'>
            <Heading.H6 data-testid='API-section'>
              <Translate>API</Translate>
            </Heading.H6>
            <ul className={styles.List}>
              <li>
                <a href={footer_links.documentation} className={styles.Link}>
                  <Text className={styles.labelcolor} size='sm'>
                    <Translate>Documentation</Translate>
                  </Text>
                </a>
              </li>
              <li>
                <a href={footer_links.dashboard} className={styles.Link}>
                  <Text size='sm' className={styles.labelcolor}>
                    <Translate>Dashboard</Translate>
                  </Text>
                </a>
              </li>
              <li>
                <a href={footer_links.api_explorer} className={styles.Link}>
                  <Text size='sm' className={styles.labelcolor}>
                    <Translate>API explorer</Translate>
                  </Text>
                </a>
              </li>
              <li>
                <a
                  href='https://deriv.com/derivtech'
                  target='_blank'
                  className={styles.Link}
                  rel='noreferrer'
                >
                  <Text size='sm' className={styles.labelcolor}>
                    <Translate>Deriv Tech</Translate>
                  </Text>
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
              <li>
                <a
                  href='https://hackerone.com/deriv?type=team'
                  target='_blank'
                  className={styles.Link}
                  rel='noreferrer'
                >
                  <Text size='sm' className={styles.labelcolor}>
                    <Translate>Bug bounty</Translate>
                  </Text>
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
            </ul>
          </section>
          <section className={styles.Section1}>
            <Heading.H6>Deriv.com</Heading.H6>
            <ul className={styles.List}>
              <li>
                <a
                  href={footer_links.root}
                  target='_blank'
                  className={styles.Link}
                  rel='noreferrer'
                >
                  <Text size='sm' className={styles.labelcolor}>
                    <Translate>Homepage</Translate>
                  </Text>
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
              <li>
                <a
                  href={footer_links.who_we_are}
                  target='_blank'
                  className={styles.Link}
                  rel='noreferrer'
                >
                  <Text size='sm' className={styles.labelcolor}>
                    <Translate>Who we are</Translate>
                  </Text>
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
              <li>
                <a
                  href={footer_links.contact_us}
                  target='_blank'
                  className={styles.Link}
                  rel='noreferrer'
                >
                  <Text
                    size='sm'
                    color='var(--component-textIcon-normal-prominent)'
                    className={styles.labelcolor}
                  >
                    <Translate>Contact us</Translate>
                  </Text>
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
            </ul>
          </section>
          <div className={styles.MobileAccordion}>
            <CustomAccordion items={accordionItems} />
          </div>
          <div className={styles.Box} data-testid='get-connected'>
            <Heading.H5 className={styles.SectionTitle}>
              <Translate>Get connected</Translate>
            </Heading.H5>
            <p className={styles.SectionContent}>
              <Text size='sm'>
                <Translate>Discuss ideas and share solutions with developers worldwide.</Translate>
              </Text>
            </p>
            <div className={styles.CommunityButton} data-testid='community-button'>
              <Button
                variant='secondary'
                color='black'
                fullWidth
                onClick={() => {
                  window.open('https://deriv.vanillacommunity.com/', '_blank');
                }}
              >
                <Translate>Join our community</Translate>
              </Button>
              <Button
                variant='secondary'
                color='black'
                fullWidth
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
            <Heading.H5 className={styles.SectionTitle}>
              <Translate>We're here to help</Translate>
            </Heading.H5>
            <p className={styles.SectionContent}>
              <Text size='sm' style={{ display: 'inline' }}>
                <Translate>Email us at</Translate>{' '}
              </Text>
              <a href='mailto:api-support@deriv.com' style={{ display: 'inline' }}>
                <Text size='sm' style={{ display: 'inline' }}>
                  <Translate>api-support@deriv.com </Translate>
                </Text>
              </a>
              <Text size='sm' style={{ display: 'inline' }}>
                <Translate>if you need any assistance or support.</Translate>
              </Text>
            </p>
            <div className={styles.EmailButton}>
              <Button
                color='black'
                size='md'
                variant='secondary'
                fullWidth
                onClick={() => {
                  window.open('mailto:api-support@deriv.com', '_blank');
                }}
              >
                <LabelPairedEnvelopeMdBoldIcon /> <Translate>Send an email</Translate>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Footer;
