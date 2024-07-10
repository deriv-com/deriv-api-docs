import React from 'react';
import CustomAccordion from '@site/src/components/CustomAccordion';
import { TTokenType } from '@site/src/types';
import ScopesCell from '../Table/scopes.cell';
import TokenActionsCell from './delete.token.cell';
import ApiTokenCell from './table.token.cell';
import './responsive-table.scss';
import AccountTypeCell from './account.type.cell';
import ApiLastUsedCell from './table.lastused.cell';

type TResponsiveTableProps = {
  tokens: TTokenType[];
};

type TAccordionItemProps = {
  label: string;
  value: React.ReactNode;
  row_wise?: boolean;
};

const AccordionItem: React.FC<TAccordionItemProps> = ({ label, value, row_wise = false }) => (
  <div
    className={`accordion_item ${row_wise ? 'accordion_item_row' : ''} ${
      !row_wise ? 'accordion_item_column' : ''
    }`}
  >
    <div className='accordion_item__label'>{label}</div>
    <div
      className={`accordion_item__value ${row_wise ? 'accordion_item__value_row' : ''} ${
        !row_wise ? 'accordion_item__value_column' : ''
      }`}
    >
      {value}
    </div>
  </div>
);

const generateContent = (token: TTokenType) => {
  return (
    <div>
      <AccordionItem label='Name' value={token.display_name} />
      <AccordionItem label='Account Type' value={<AccountTypeCell />} />
      <AccordionItem label='Token' value={token.token} />
      <AccordionItem label='Scopes' value={<ScopesCell cell={{ value: token.scopes }} />} />
      <AccordionItem label='Last Used' value={<ApiLastUsedCell value={token.last_used} />} />
      <AccordionItem label='Actions' value={<TokenActionsCell flex_end tokenId={token.token} />} />
    </div>
  );
};

const ResponsiveTable = ({ tokens }: TResponsiveTableProps) => {
  const items = tokens.map((token) => ({
    header: token.display_name,
    content: generateContent(token),
  }));

  const containerClass = `custom-responsive-table ${
    window.innerWidth <= 800
      ? 'custom-responsive-table--mobile'
      : 'custom-responsive-table--desktop'
  }`;

  return <CustomAccordion items={items} className={containerClass} />;
};

export default ResponsiveTable;
