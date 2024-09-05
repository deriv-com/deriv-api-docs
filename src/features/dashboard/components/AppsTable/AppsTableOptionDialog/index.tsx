import React from 'react';
import { Checkbox, Modal, RadioGroup } from '@deriv-com/quill-ui';

interface IAppsTableOption {
  [key: string]: string;
}

export const tableSortOptions: IAppsTableOption = {
  appNameAscending: 'App name (A to Z)',
  appNameDescending: 'App name (Z to A)',
  appIdAscending: 'App ID (A to Z)',
  appIdDescending: 'App ID (Z to A)',
};

export const tableFilterOptions: IAppsTableOption = {
  all: 'All',
  no_scope: '(No scope)',
  admin: 'Admin',
  payments: 'Payments',
  read: 'Read',
  trade: 'Trade',
  trading_information: 'Trading Information',
};

interface IAppsTableOptionsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption?: string;
  selectedOptions?: string[];
}

const SortOptions: React.FC<IAppsTableOptionsProps> = ({ handleChange, selectedOption }) => {
  return (
    <>
      <Modal.Header title='Sort by' />
      <Modal.Body>
        <RadioGroup name='radioGroup' onToggle={handleChange} selected={selectedOption}>
          {Object.keys(tableSortOptions).map((key) => (
            <RadioGroup.Item
              key={key}
              label={tableSortOptions[key]}
              value={key}
              data-testid={key}
            />
          ))}
        </RadioGroup>
      </Modal.Body>
    </>
  );
};

const FilterOptions: React.FC<IAppsTableOptionsProps> = ({ handleChange, selectedOptions }) => {
  return (
    <>
      <Modal.Header title='Filter by OAuth scopes' />
      <Modal.Body>
        {Object.keys(tableFilterOptions).map((option) => (
          <Checkbox
            key={option}
            checkboxPosition='left'
            id={option}
            label={tableFilterOptions[option]}
            name={option}
            onChange={handleChange}
            checked={selectedOptions.includes(option)}
            size='md'
            data-testid={option}
          />
        ))}
      </Modal.Body>
    </>
  );
};

export interface IAppTableSelectedOptions {
  sortBy: string;
  filterBy: string[];
}

export interface IAppsTableOptionDialog {
  optionType: 'sort' | 'filter';
  isDialogOpen: boolean;
  selectedOptions: IAppTableSelectedOptions;
  updateSelectedOptions: (options: IAppTableSelectedOptions) => void;
  toggleAppTableDialog: (isOpened: boolean) => void;
}

const AppsTableOptionDialog = ({
  optionType,
  isDialogOpen,
  selectedOptions,
  updateSelectedOptions,
  toggleAppTableDialog,
}: IAppsTableOptionDialog) => {
  const [selectedSortOption, setSelectedSortOption] = React.useState(selectedOptions.sortBy);
  const [selectedFilterOptions, setSelectedFilterOptions] = React.useState(
    selectedOptions.filterBy,
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const isAllSelected = selectedFilterOptions.includes('all');

    if (!isAllSelected && name === 'all') {
      setSelectedFilterOptions(Object.keys(tableFilterOptions));
      return;
    }
    let filters = [...selectedFilterOptions];

    if (filters.includes(name)) {
      filters = filters.filter((option) => option !== name && option !== 'all');
    } else {
      filters = [...filters, name];
    }

    if (filters.length === Object.keys(tableFilterOptions).length - 1) {
      filters = [...filters, 'all'];
    }

    setSelectedFilterOptions(filters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortOption(e.target.value);
  };

  const handleApply = () => {
    const selectedOptions: IAppTableSelectedOptions = {
      sortBy: selectedSortOption,
      filterBy: selectedFilterOptions,
    };
    updateSelectedOptions(selectedOptions);
  };

  return (
    <Modal
      isMobile
      showHandleBar
      toggleModal={toggleAppTableDialog}
      primaryButtonLabel='Apply'
      primaryButtonCallback={handleApply}
      isOpened={isDialogOpen}
      className='apps_table__options_dialog'
    >
      {optionType === 'sort' ? (
        <SortOptions handleChange={handleSortChange} selectedOption={selectedSortOption} />
      ) : (
        <FilterOptions handleChange={handleFilterChange} selectedOptions={selectedFilterOptions} />
      )}
    </Modal>
  );
};

export default AppsTableOptionDialog;
