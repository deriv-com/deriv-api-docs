import { ApplicationObject } from '@deriv/api-types';
import React, { HTMLAttributes, useCallback, useState } from 'react';
import { Cell, Column } from 'react-table';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';

import useAppManager from '@site/src/hooks/useAppManager';
import useDeviceType from '@site/src/hooks/useDeviceType';
import ResponsiveTable from './responsive-table';
import AppActionsCell from './app-actions.cell';
import CopyTextCell from '../Table/copy-text.cell';
import DeleteAppDialog from '../Dialogs/DeleteAppDialog';
import ScopesCell from '../Table/scopes.cell';
import Table from '../Table';
import UpdateAppDialog from '../Dialogs/UpdateAppDialog';
import clsx from 'clsx';
import './apps-table.scss';

export type TAppColumn = Column<ApplicationObject>;

const appTableColumns: TAppColumn[] = [
  {
    Header: 'App’s name',
    accessor: 'name',
    minWidth: 150,
    maxWidth: 200,
  },
  {
    Header: 'App ID',
    accessor: 'app_id',
    minWidth: 120,
    maxWidth: 150,
    Cell: CopyTextCell,
  },
  {
    Header: 'OAuth scopes',
    accessor: 'scopes',
    minWidth: 200,
    Cell: ScopesCell,
  },
  {
    Header: 'OAuth redirect URL',
    accessor: 'redirect_uri',
    minWidth: 350,
    Cell: CopyTextCell,
  },
  {
    Header: 'Actions',
    id: 'actions',
    accessor: (originalRow) => originalRow.app_id,
    Cell: AppActionsCell,
  },
];

interface AppsTableProps extends HTMLAttributes<HTMLTableElement> {
  apps: ApplicationObject[];
}

const AppsTableHeader: React.FC<{ is_desktop: boolean }> = ({ is_desktop }) => {
  const { updateCurrentTab } = useAppManager();

  return (
    <div
      className={clsx('apps_table__header', {
        mobile: !is_desktop,
      })}
    >
      <div className='apps_table__header__texts'>
        <Heading.H3>App manager</Heading.H3>
        <Text size='md'>
          Here&apos;s where you can see your app&apos;s details. Edit your app settings to suit your
          needs or delete them permanently.
        </Text>
      </div>
      <Button
        color='coral'
        size='lg'
        variant='primary'
        role='submit'
        iconPosition='start'
        icon={<LabelPairedCirclePlusMdRegularIcon />}
        className='apps_table__header__button'
        onClick={() => {
          updateCurrentTab('REGISTER_APP');
        }}
      >
        Register new application
      </Button>
    </div>
  );
};

const AppsTable = ({ apps }: AppsTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [actionRow, setActionRow] = useState<ApplicationObject>();
  const { deviceType } = useDeviceType();
  const is_desktop = deviceType === 'desktop';

  const getActionObject = useCallback((item: ApplicationObject) => {
    return {
      openDeleteDialog: () => {
        setActionRow(item);
        // setIsDeleteOpen(true);
      },

      openEditDialog: () => {
        setActionRow(item);
        // setIsEditOpen(true);
      },
    };
  }, []);

  const getCustomCellProps = useCallback(
    (cell: Cell<ApplicationObject, unknown>) => {
      return getActionObject(cell.row.original);
    },
    [getActionObject],
  );

  const accordionActions = useCallback(
    (item: ApplicationObject) => {
      return getActionObject(item);
    },
    [getActionObject],
  );

  const onCloseEdit = () => {
    setActionRow(null);
    setIsEditOpen(false);
  };

  const onCloseDelete = () => {
    setActionRow(null);
    setIsDeleteOpen(false);
  };

  const renderTable = () => {
    return is_desktop ? (
      <Table
        data={apps}
        columns={appTableColumns}
        getCustomCellProps={getCustomCellProps}
        parentClass='apps_table'
      />
    ) : (
      <ResponsiveTable apps={apps} accordionActions={accordionActions} />
    );
  };

  return (
    <div
      className={clsx('apps_table', {
        mobile: !is_desktop,
      })}
    >
      {isDeleteOpen && <DeleteAppDialog appId={actionRow.app_id} onClose={onCloseDelete} />}
      {isEditOpen && <UpdateAppDialog app={actionRow} onClose={onCloseEdit} />}
      <div>
        <AppsTableHeader is_desktop={is_desktop} />
        {apps?.length ? renderTable() : null}
      </div>
    </div>
  );
};

export default AppsTable;
