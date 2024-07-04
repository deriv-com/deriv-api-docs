import React from 'react';
import CustomAccordion from '@site/src/components/CustomAccordion';
import { TTokenType } from '@site/src/types';
import ScopesCell from '../Table/scopes.cell';
import TokenActionsCell from './delete.token.cell';
import ApiTokenCell from './table.token.cell';
import clsx from 'clsx';
import './responsive-table.scss';
import AccountTypeCell from './account.type.cell';
import ApiLastUsedCell from './table.lastused.cell';

type TResponsiveTableProps = {
  tokens: TTokenType[];
  accordionActions: TAccordionActions;
};

type TAccordionActions = (item: TTokenType) => {
  openDeleteDialog: () => void;
};

type TAccordionItemProps = {
  label: string;
  value: React.ReactNode;
  row_wise?: boolean;
};

const AccordionItem: React.FC<TAccordionItemProps> = ({ label, value, row_wise = false }) => (
  <div
    className={clsx('accordion_item', {
      accordion_item_row: row_wise,
      accordion_item_column: !row_wise,
    })}
  >
    <div className='accordion_item__label'>{label}</div>
    <div
      className={clsx('accordion_item__value', {
        accordion_item__value_row: row_wise,
        accordion_item__value_column: !row_wise,
      })}
    >
      {value}
    </div>
  </div>
);

const generateContent = (token: TTokenType, accordionActions: TAccordionActions) => {
  return (
    <div>
      <AccordionItem label='Name' value={token.display_name} />
      <AccordionItem label='Account Type' value={<AccountTypeCell />} />
      <AccordionItem label='Token' value={token.token} />
      <AccordionItem label='Scopes' value={<ScopesCell cell={{ value: token.scopes }} />} />
      <AccordionItem label='Last Used' value={<ApiLastUsedCell value={token.last_used} />} />
      <AccordionItem
        label='Actions'
        value={
          <TokenActionsCell flex_end openDeleteDialog={accordionActions(token).openDeleteDialog} />
        }
      />
    </div>
  );
};

const ResponsiveTable = ({ tokens, accordionActions }: TResponsiveTableProps) => {
  const items = tokens.map((token) => ({
    header: token.display_name,
    content: generateContent(token, accordionActions),
  }));

  const containerClass = clsx('custom-responsive-table', {
    'custom-responsive-table--mobile': window.innerWidth <= 800,
    'custom-responsive-table--desktop': window.innerWidth > 800,
  });

  return <CustomAccordion items={items} className={containerClass} />;
};

export default ResponsiveTable;
