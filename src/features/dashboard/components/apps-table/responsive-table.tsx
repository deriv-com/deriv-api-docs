import React from 'react';
import clsx from 'clsx';
import { ApplicationObject } from '@deriv/api-types';
import { translate } from '@docusaurus/Translate';
import CustomAccordion from '@site/src/components/CustomAccordion';
import AppActionsCell from './app-actions.cell';
import CopyTextCell from '../common-table/cell-copy-text';
import ScopesCell from '../common-table/cell-scopes';
import './responsive-table.scss';


type TResponsiveTableProps = {
  apps: ApplicationObject[];
  accordionActions: TAccordionActions;
};

type TAccordionActions = (item: ApplicationObject) => {
  openDeleteDialog: () => void;
  openEditDialog: () => void;
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

const generateContent = (item: ApplicationObject, accordionActions: TAccordionActions) => {
  return (
    <div>
      <AccordionItem
        label={translate({ message: 'App ID' })}
        value={<CopyTextCell cell={{ value: item.app_id }} />}
      />
      <AccordionItem
        label={translate({ message: 'OAuth Scopes' })}
        value={
          <ScopesCell
            cell={{
              value: item.scopes,
            }}
          />
        }
      />
      <AccordionItem
        label={translate({ message: 'OAuth Redirect URL' })}
        value={<CopyTextCell cell={{ value: item.redirect_uri }} />}
        row_wise
      />
      <AccordionItem
        label={translate({ message: 'Actions' })}
        value={
          <AppActionsCell
            flex_end
            openDeleteDialog={accordionActions(item).openDeleteDialog}
            openEditDialog={accordionActions(item).openEditDialog}
          />
        }
      />
    </div>
  );
};

const ResponsiveTable = ({ apps, accordionActions }: TResponsiveTableProps) => {
  const items = apps.map((app) => ({
    header: app.name,
    content: generateContent(app, accordionActions),
  }));
  return <CustomAccordion items={items} />;
};

export default ResponsiveTable;
