import React from 'react';
import CustomAccordion from '@site/src/components/CustomAccordion';
import { TTokenType } from '@site/src/types';
import ScopesCell from '../Table/scopes.cell';
import TokenActionsCell from './delete.token.cell';
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
      <AccordionItem label='Token' value={token.token} />
      <AccordionItem label='Account type' value={<AccountTypeCell />} />
      <AccordionItem label='Token scopes' value={<ScopesCell cell={{ value: token.scopes }} />} />
      <AccordionItem
        label='Last used'
        value={<ApiLastUsedCell cell={{ value: token.last_used }} />}
      />
      <AccordionItem label='Actions' value={<TokenActionsCell flex_end tokenId={token.token} />} />
    </div>
  );
};

const ResponsiveTable = ({ tokens }: TResponsiveTableProps) => {
  const items = tokens.map((token) => ({
    header: token.display_name,
    content: generateContent(token),
  }));

  return <CustomAccordion items={items} />;
};

export default ResponsiveTable;
