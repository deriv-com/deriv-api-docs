import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Cell, Column } from 'react-table';
import clsx from 'clsx';
import { ApplicationObject } from '@deriv/api-types';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import {
  LabelPairedCirclePlusMdRegularIcon,
  LabelPairedSortLgRegularIcon,
  LabelPairedSortMdRegularIcon,
  LabelPairedSortUpMdFillIcon,
  LabelPairedSortDownMdFillIcon,
  LabelPairedBarsFilterLgRegularIcon,
} from '@deriv/quill-icons';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';
import useDeviceType from '@site/src/hooks/useDeviceType';
import Table from '../Table';
import ScopesCell from '../Table/scopes.cell';
import CopyTextCell from '../Table/copy-text.cell';
import DeleteAppDialog from '../Dialogs/DeleteAppDialog';
import AppsTableOptionDialog, {
  IAppTableSelectedOptions,
  tableFilterOptions,
  tableSortOptions,
} from './AppsTableOptionDialog';
import ResponsiveTable from './responsive-table';
import AppActionsCell from './app-actions.cell';
import './apps-table.scss';

export type TAppColumn = Column<ApplicationObject>;

interface AppsTableProps extends HTMLAttributes<HTMLTableElement> {
  apps: ApplicationObject[];
}

interface IAppsTableOptions {
  is_desktop: boolean;
  onSelectOption: (type: 'sort' | 'filter') => void;
}

const AppsTableOptions: React.FC<IAppsTableOptions> = ({ onSelectOption, is_desktop }) => {
  if (is_desktop) return;

  return (
    <div className='apps_table__options'>
      <Button
        color='black'
        size='lg'
        variant='secondary'
        type='button'
        iconPosition='start'
        icon={<LabelPairedSortLgRegularIcon />}
        data-testid='mb-sort-button'
        className='apps_table__options__button'
        onClick={() => onSelectOption('sort')}
      >
        <span className='apps_table__options__button__text'>Sort</span>
      </Button>
      <Button
        color='black'
        size='lg'
        variant='secondary'
        type='button'
        iconPosition='start'
        icon={<LabelPairedBarsFilterLgRegularIcon />}
        data-testid='mb-filter-button'
        className='apps_table__options__button'
        onClick={() => onSelectOption('filter')}
      >
        <span className='apps_table__options__button__text'>Filter</span>
      </Button>
    </div>
  );
};

const AppsTableHeader: React.FC<{
  is_desktop: boolean;
  updateCurrentTab: (tab: TDashboardTab) => void;
}> = ({ is_desktop, updateCurrentTab }) => {
  return (
    <div
      className={clsx('apps_table__header', {
        mobile: !is_desktop,
      })}
    >
      <div className='apps_table__header__texts'>
        <Heading.H3>Application manager</Heading.H3>
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
          updateCurrentTab(TDashboardTab.REGISTER_APP);
        }}
      >
        <span className='apps_table__header__button__text'>Register new application</span>
      </Button>
    </div>
  );
};

interface IAppsTableSortColumnProps {
  id: string;
  columnName: string;
  selectedSortOption: string;
  onPressSort: (columnId: string) => void;
}

const AppsTableSortColumn: React.FC<IAppsTableSortColumnProps> = ({
  id,
  columnName,
  selectedSortOption,
  onPressSort,
}) => {
  const getColumnIcon = () => {
    if (selectedSortOption.includes('Ascending') && selectedSortOption.includes(id))
      return <LabelPairedSortUpMdFillIcon />;
    if (selectedSortOption.includes('Descending') && selectedSortOption.includes(id))
      return <LabelPairedSortDownMdFillIcon />;
    return <LabelPairedSortMdRegularIcon />;
  };

  return (
    <div className='sortColumn' onClick={() => onPressSort(id)} data-testid={id}>
      {columnName} {getColumnIcon()}
    </div>
  );
};

const AppsTable = ({ apps }: AppsTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionRow, setActionRow] = useState<ApplicationObject>();
  const { updateCurrentTab, handleCurrentUpdatingItem } = useAppManager();
  const { deviceType } = useDeviceType();
  const is_desktop = deviceType === 'desktop';

  const [applications, setApplications] = useState<ApplicationObject[]>();
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false);
  const [optionType, setOptionType] = useState<'sort' | 'filter'>('sort');
  const [selectedOptions, setSelectedOptions] = useState<IAppTableSelectedOptions>({
    sortBy: Object.keys(tableSortOptions)[3],
    filterBy: Object.keys(tableFilterOptions),
  });

  useEffect(() => {
    applyOptionCriteria();
  }, [selectedOptions, apps]);

  const getActionObject = useCallback(
    (item: ApplicationObject) => {
      return {
        openDeleteDialog: () => {
          setActionRow(item);
          setIsDeleteOpen(true);
        },

        openEditDialog: () => {
          handleCurrentUpdatingItem(item);
          updateCurrentTab(TDashboardTab.UPDATE_APP);
        },
      };
    },
    [handleCurrentUpdatingItem, updateCurrentTab],
  );

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

  const onCloseDelete = () => {
    setActionRow(null);
    setIsDeleteOpen(false);
  };

  const renderTableColumns = () => {
    const appTableColumns: TAppColumn[] = [
      {
        Header: (
          <AppsTableSortColumn
            id='appName'
            columnName='App’s name'
            selectedSortOption={selectedOptions.sortBy}
            onPressSort={onPressSort}
          />
        ),
        accessor: 'name',
        minWidth: 150,
        maxWidth: 200,
      },
      {
        Header: (
          <AppsTableSortColumn
            id='appId'
            columnName='App ID'
            selectedSortOption={selectedOptions.sortBy}
            onPressSort={onPressSort}
          />
        ),
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
    return appTableColumns;
  };

  const renderTable = () => {
    return is_desktop ? (
      <Table
        data={applications}
        columns={renderTableColumns()}
        getCustomCellProps={getCustomCellProps}
        parentClass='apps_table'
      />
    ) : (
      <ResponsiveTable apps={applications} accordionActions={accordionActions} />
    );
  };

  const onSelectOption = (type: 'sort' | 'filter') => {
    setOptionType(type);
    setIsOptionDialogOpen(true);
  };

  const onPressSort = (columnId: string) => {
    const { sortBy } = selectedOptions;
    const sortType = sortBy.includes('Descending') ? 'Ascending' : 'Descending';
    setSelectedOptions({ ...selectedOptions, sortBy: `${columnId}${sortType}` });
  };

  const getAppsTableOptionDialogProps = () => {
    return {
      optionType,
      isDialogOpen: isOptionDialogOpen,
      selectedOptions,
      updateSelectedOptions: setSelectedOptions,
      toggleAppTableDialog: setIsOptionDialogOpen,
    };
  };

  const applyOptionCriteria = useCallback(() => {
    const { sortBy, filterBy } = selectedOptions;
    let appsList = [...apps];

    // Filter apps based on selected scopes
    if (filterBy.includes('all')) appsList = apps;
    else {
      const filterList = appsList.filter((app) =>
        filterBy.some((filter) => app.scopes.includes(filter)),
      );
      appsList = filterList;

      if (filterBy.includes('no_scope')) {
        const noScopeList = apps.filter((app) => app.scopes.length === 0);
        appsList = [...appsList, ...noScopeList];
      }
    }

    // Sort apps based on selected column
    const selectedColumn = sortBy.includes('appId') ? 'app_id' : 'name';
    const isAscending = sortBy.includes('Ascending');

    appsList.sort((a, b) => {
      const valueA = a[selectedColumn];
      const valueB = b[selectedColumn];

      if (valueA < valueB) {
        return isAscending ? -1 : 1;
      }
      if (valueA > valueB) {
        return isAscending ? 1 : -1;
      }
    });

    // Update the state with the filtered and sorted apps
    setApplications([...appsList]);
    !is_desktop && setIsOptionDialogOpen(false);
  }, [selectedOptions, apps, is_desktop]);

  return (
    <div
      className={clsx('apps_table', {
        mobile: !is_desktop,
      })}
    >
      {isDeleteOpen && <DeleteAppDialog appId={actionRow.app_id} onClose={onCloseDelete} />}
      <div>
        <AppsTableHeader is_desktop={is_desktop} updateCurrentTab={updateCurrentTab} />

        <AppsTableOptions onSelectOption={onSelectOption} is_desktop={is_desktop} />

        {applications?.length ? renderTable() : null}

        {!is_desktop && <AppsTableOptionDialog {...getAppsTableOptionDialogProps()} />}
      </div>
    </div>
  );
};

export default AppsTable;
