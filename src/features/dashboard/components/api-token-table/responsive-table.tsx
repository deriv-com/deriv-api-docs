import React from 'react';
import CustomAccordion from '@site/src/components/CustomAccordion';
import { TTokenType } from '@site/src/types';
import ScopesCell from '../table/scopes-cell';
import TokenActionsCell from './cell-delete-token';
import AccountTypeCell from './cell-account-type';
import ApiLastUsedCell from './cell-last-used';

type TResponsiveTableProps = {
  tokens: TTokenType[];
};

type TAccordionItemProps = {
  label: string;
  value: React.ReactNode;
};

const AccordionItem: React.FC<TAccordionItemProps> = ({ label, value }) => (
  <div className={`accordion_item accordion_item_column`}>
    <div className='accordion_item__label'>{label}</div>
    <div className={`accordion_item__value accordion_item__value_column`}>{value}</div>
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
