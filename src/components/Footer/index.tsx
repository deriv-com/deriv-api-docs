import React from 'react';
import { Text } from '@deriv/ui';
import styles from './Footer.module.scss';
import { LabelPairedArrowUpRightSmRegularIcon } from '@deriv/quill-icons';
import { Button } from '@deriv-com/quill-ui';
import { SocialTelegramBlackIcon } from '@deriv/quill-icons';
import { LabelPairedEnvelopeCaptionBoldIcon } from '@deriv/quill-icons';
import CustomAccordion from '../CustomAccordion';

const Footer = () => {
  const accordionItems = [
    {
      header: 'API',
      content: (
        <ul className={styles.List}>
          <li>
            <a href='/docs/intro' className={styles.Link}>
              Documentation
            </a>
          </li>
          <li>
            <a href='/dashboard' className={styles.Link}>
              Dashboard
            </a>
          </li>
          <li>
            <a href='/api-explorer' className={styles.Link}>
              API explorer
            </a>
          </li>
          <li>
            <a href='https://tech.deriv.com/' target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> Deriv Tech
            </a>
          </li>
          <li>
            <a href='https://hackerone.com/deriv?type=team' target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> Bug bounty
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
            <a href='https://deriv.com/' target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> Homepage
            </a>
          </li>
          <li>
            <a href='https://deriv.com/who-we-are/' target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> Who we are
            </a>
          </li>
          <li>
            <a href='https://deriv.com/contact-us/' target='blank' className={styles.Link}>
              <LabelPairedArrowUpRightSmRegularIcon /> Contact us
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
          <img src='img/logo.png' alt='Deriv API Logo' className={styles.FooterLogo} />
        </div>
        <div className={styles.FooterSection}>
          <section className={styles.Section1} data-testid='section'>
            <Text
              type='subtitle-1'
              as='h3'
              className={styles.SectionTitle}
              data-testid='API-section'
            >
              API
            </Text>
            <ul className={styles.List}>
              <li>
                <a href='/docs/intro' className={styles.Link}>
                  Documentation
                </a>
              </li>
              <li>
                <a href='/dashboard' className={styles.Link}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href='/api-explorer' className={styles.Link}>
                  API explorer
                </a>
              </li>
              <li>
                <a href='https://tech.deriv.com/' target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> Deriv Tech
                </a>
              </li>
              <li>
                <a
                  href='https://hackerone.com/deriv?type=team'
                  target='blank'
                  className={styles.Link}
                >
                  <LabelPairedArrowUpRightSmRegularIcon /> Bug bounty
                </a>
              </li>
            </ul>
          </section>
          <section className={styles.Section1}>
            <Text type='subtitle-1' as='h3' className={styles.SectionTitle}>
              Deriv.com
            </Text>
            <ul className={styles.List}>
              <li>
                <a href='https://deriv.com/' target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> Homepage
                </a>
              </li>
              <li>
                <a href='https://deriv.com/who-we-are/' target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> Who we are
                </a>
              </li>
              <li>
                <a href='https://deriv.com/contact-us/' target='blank' className={styles.Link}>
                  <LabelPairedArrowUpRightSmRegularIcon /> Contact us
                </a>
              </li>
            </ul>
          </section>
          <div className={styles.MobileAccordion}>
            <CustomAccordion items={accordionItems} />
          </div>
          <div className={styles.Box} data-testid='get-connected'>
            <Text type='subtitle-1' as='h3' className={styles.SectionTitle}>
              Get connected
            </Text>
            <p className={styles.SectionContent}>
              Discuss ideas and share solutions with developers worldwide.
            </p>
            <div className={styles.CommunityButton} data-testid='community-button'>
              <Button
                color='black'
                size='md'
                variant='secondary'
                onClick={() => {
                  window.open('https://community.deriv.com/', '_blank');
                }}
              >
                Join our community
              </Button>
              <Button
                color='black'
                size='md'
                variant='secondary'
                onClick={() => {
                  window.open('https://t.me/derivdotcomofficial', '_blank');
                }}
              >
                <SocialTelegramBlackIcon fill='#000000' iconSize='xs' /> Telegram
              </Button>
            </div>
          </div>
          <div className={styles.Box}>
            <Text type='subtitle-1' as='h3' className={styles.SectionTitle}>
              We're here to help
            </Text>
            <p className={styles.SectionContent}>
              Email us at <a href={'mailto:api-support@deriv.com'}>api-support@deriv.com</a> if you
              need any assistance or support.
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
                <LabelPairedEnvelopeCaptionBoldIcon /> Send an email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
