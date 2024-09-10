import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { findFirstSidebarItemLink, useDocById } from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/DocCard';

import styles from './styles.module.scss';
import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';

const CardContainer = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link href={href} className={clsx('card padding--lg', styles.cardContainer)}>
      {children}
    </Link>
  );
};

const CardLayout = ({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}) => {
  return (
    <CardContainer href={href}>
      <h2 className={clsx('text--truncate', styles.cardTitle)} title={title}>
        {icon} {title}
      </h2>
      {description && (
        <p className={clsx('text--truncate', styles.cardDescription)} title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
};

const CardCategory = ({ item }: { item: PropSidebarItemCategory }) => {
  const href = findFirstSidebarItemLink(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      href={href}
      icon=''
      title={item.label}
      description={translate(
        {
          message: '{count} items',
          id: 'theme.docs.DocCard.categoryDescription',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        { count: item.items.length },
      )}
    />
  );
};

const CardLink = ({ item }: { item: PropSidebarItemLink }) => {
  const doc = useDocById(item.docId ?? undefined);
  return <CardLayout href={item.href} icon='' title={item.label} description={doc?.description} />;
};

const DocCard = ({ item }: Props) => {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
};

export default DocCard;
