import React from 'react';
import { Checkbox, Modal, RadioGroup } from '@deriv-com/quill-ui';
import { translate } from '@docusaurus/Translate';

interface IAppsTableOption {
  [key: string]: string;
}

export const tableSortOptions: IAppsTableOption = {
  appNameAscending: translate({ message: 'App name (A to Z)' }),
  appNameDescending: translate({ message: 'App name (Z to A)' }),
  appIdAscending: translate({ message: 'App ID (A to Z)' }),
  appIdDescending: translate({ message: 'App ID (Z to A)' }),
};

export const tableFilterOptions: IAppsTableOption = {
  all: translate({ message: 'All' }),
  no_scope: translate({ message: '(No scope)' }),
  admin: translate({ message: 'Admin' }),
  payments: translate({ message: 'Payments' }),
  read: translate({ message: 'Read' }),
  trade: translate({ message: 'Trade' }),
  trading_information: translate({ message: 'Trading Information' }),
};

interface IAppsTableOptionsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption?: string;
  selectedOptions?: string[];
}

const SortOptions: React.FC<IAppsTableOptionsProps> = ({ handleChange, selectedOption }) => {
  return (
    <>
      <Modal.Header title={translate({ message: 'Sort by' })} />
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
      <Modal.Header title={translate({ message: 'Filter by OAuth scopes' })} />
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
      primaryButtonLabel={translate({ message: 'Apply' })}
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
