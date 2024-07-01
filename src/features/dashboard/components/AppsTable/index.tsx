import { ApplicationObject } from '@deriv/api-types';
import React, { HTMLAttributes, useCallback, useState } from 'react';
import { Cell, Column } from 'react-table';
import NoApps from '../NoApps';
import DeleteAppDialog from '../Dialogs/DeleteAppDialog';
import UpdateAppDialog from '../Dialogs/UpdateAppDialog';
import Table from '../Table';
import ScopesCell from '../Table/scopes.cell';
import AppActionsCell from './app-actions.cell';
import { translate } from '@docusaurus/Translate';

export type TAppColumn = Column<ApplicationObject>;

const appTableColumns: TAppColumn[] = [
  {
    Header: translate({ message: 'Application Name' }),
    accessor: 'name',
  },
  {
    Header: translate({ message: 'Application ID' }),
    accessor: 'app_id',
  },
  {
    Header: translate({ message: 'Scopes' }),
    accessor: 'scopes',
    Cell: ScopesCell,
  },
  {
    Header: translate({ message: 'Redirect URL' }),
    accessor: 'redirect_uri',
  },
  {
    Header: translate({ message: 'Actions' }),
    id: 'actions',
    accessor: (originalRow) => originalRow.app_id,
    Cell: AppActionsCell,
  },
];

interface AppsTableProps extends HTMLAttributes<HTMLTableElement> {
  apps: ApplicationObject[];
}

const AppsTable = ({ apps }: AppsTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [actionRow, setActionRow] = useState<ApplicationObject>();

  const getCustomCellProps = useCallback((cell: Cell<ApplicationObject, unknown>) => {
    return {
      openDeleteDialog: () => {
        setActionRow(cell.row.original);
        setIsDeleteOpen(true);
      },

      openEditDialog: () => {
        setActionRow(cell.row.original);
        setIsEditOpen(true);
      },
    };
  }, []);

  const onCloseEdit = () => {
    setActionRow(null);
    setIsEditOpen(false);
  };

  const onCloseDelete = () => {
    setActionRow(null);
    setIsDeleteOpen(false);
  };

  if (apps.length) {
    return (
      <>
        {isDeleteOpen && <DeleteAppDialog appId={actionRow.app_id} onClose={onCloseDelete} />}
        {isEditOpen && <UpdateAppDialog app={actionRow} onClose={onCloseEdit} />}
        <Table data={apps} columns={appTableColumns} getCustomCellProps={getCustomCellProps} />
      </>
    );
  }
  return <NoApps />;
};

export default AppsTable;
