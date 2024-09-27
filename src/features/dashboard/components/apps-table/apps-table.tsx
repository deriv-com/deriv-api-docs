import React, { HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';
import clsx from 'clsx';
import { ApplicationObject } from '@deriv/api-types';
import { Button, DropdownButton, Heading, Text, TSingleSelectItem } from '@deriv-com/quill-ui';
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
import Table from '../table';
import ScopesCell from '../table/scopes-cell';
import CopyTextCell from '../table/copy-text-cell';
import DeleteAppDialog from '../dialogs/delete-app-dialog';
import AppsTableOptionDialog, {
  IAppTableSelectedOptions,
  tableFilterOptions,
  tableSortOptions,
} from './option-dialog';
import ResponsiveTable from './responsive-table';
import AppActionsCell from './app-actions.cell';
import './apps-table.scss';
import Translate, { translate } from '@docusaurus/Translate';

export type TAppColumn = Column<ApplicationObject>;

interface AppsTableProps extends HTMLAttributes<HTMLTableElement> {
  apps: ApplicationObject[];
}

interface IAppsTableOptions {
  is_desktop: boolean;
  onSelectOption: (type: 'sort' | 'filter') => void;
  selectedFilters: string[];
  onFilterChange: (filters: string) => void;
}

const AppsTableOptions: React.FC<IAppsTableOptions> = ({
  onSelectOption,
  is_desktop,
  onFilterChange,
  selectedFilters,
}) => {
  if (is_desktop) {
    const renderFilterOptions = () => {
      const options: TSingleSelectItem[] = Object.keys(tableFilterOptions).map((key) => {
        return {
          id: key,
          label: tableFilterOptions[key],
          selected: selectedFilters.includes(key),
          'data-testid': `filter-${key}`,
          onClick: () => onFilterChange(key),
        };
      });
      return options;
    };

    return (
      <div className='apps_table__options'>
        <DropdownButton
          className='apps_table__options__filter_dropdown'
          contentTitle='Filter by OAuth scopes'
          contentHeight='md'
          options={renderFilterOptions()}
          icon={<LabelPairedBarsFilterLgRegularIcon />}
          iconPosition='start'
          color='black'
          variant='secondary'
          contentAlign='right'
          data-testid='filter-dropdown'
          checkbox
        />
      </div>
    );
  }
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
        <span className='apps_table__options__button__text'>
          <Translate>Sort</Translate>
        </span>
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
        <span className='apps_table__options__button__text'>
          <Translate>Filter</Translate>
        </span>
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
        <Heading.H3>
          <Translate>Application manager</Translate>
        </Heading.H3>
        <Text size='md'>
          <Translate>
            Here&apos;s where you can see your app&apos;s details. Edit your app settings to suit
            your needs or delete them permanently.
          </Translate>
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
        <span className='apps_table__header__button__text'>
          <Translate>Register new application</Translate>
        </span>
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
            columnName={translate({ message: 'App’s name' })}
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
            columnName={translate({ message: 'App ID' })}
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
        Header: translate({ message: 'OAuth scopes' }),
        accessor: 'scopes',
        Cell: ScopesCell,
        minWidth: 230,
      },
      {
        Header: translate({ message: 'OAuth redirect URL' }),
        accessor: 'redirect_uri',
        width: 400,
        maxWidth: 520,
        Cell: CopyTextCell,
      },
      {
        Header: translate({ message: 'Actions' }),
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

  const onFilterChange = (name: string) => {
    const { filterBy } = selectedOptions;
    const isAllSelected = filterBy.includes('all');

    if (!isAllSelected && name === 'all') {
      setSelectedOptions((prev) => ({ ...prev, filterBy: Object.keys(tableFilterOptions) }));
      return;
    }

    let filters = [...filterBy];

    if (filters.includes(name)) {
      filters = filters.filter((option) => option !== name && option !== 'all');
    } else {
      filters = [...filters, name];
    }

    const allOptionSelected = filters.length === Object.keys(tableFilterOptions).length - 1;
    if (allOptionSelected && !filterBy.includes('all')) {
      filters = [...filters, 'all'];
    }

    setSelectedOptions((prev) => ({ ...prev, filterBy: filters }));
  };

  const apps_table_option_dialog_props = useMemo(() => {
    return {
      optionType,
      isDialogOpen: isOptionDialogOpen,
      selectedOptions,
      updateSelectedOptions: setSelectedOptions,
      toggleAppTableDialog: setIsOptionDialogOpen,
    };
  }, [isOptionDialogOpen, optionType, selectedOptions]);

  const apps_table_option_props = useMemo(() => {
    return {
      is_desktop,
      onSelectOption,
      selectedFilters: selectedOptions.filterBy,
      onFilterChange,
    };
  }, [selectedOptions, is_desktop]);

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
      let valueA = a[selectedColumn];
      let valueB = b[selectedColumn];

      if (selectedColumn === 'name') {
        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

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
      <AppsTableHeader is_desktop={is_desktop} updateCurrentTab={updateCurrentTab} />

      <AppsTableOptions {...apps_table_option_props} />

      {applications?.length ? renderTable() : null}

      {!is_desktop && <AppsTableOptionDialog {...apps_table_option_dialog_props} />}
    </div>
  );
};

export default AppsTable;
