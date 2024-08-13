import React from 'react';
import { playground_requests } from '@site/src/utils/playground_requests';
import clsx from 'clsx';
import styles from './DropdownList.module.scss';

type TOption = {
  name: string;
  title: string;
  body: Record<string, any>;
};

type TDropdownList = {
  selected: string;
  setSelected: (value: string) => void;
  selected_value: string;
  handleChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => void;
  searchResults: string;
  setIsActive: (value: boolean) => void;
  setSearchResults: (result: string) => void;
};

const filterOptions = (options, query) => {
  query = query.toLowerCase();
  return Object.values(options).filter((option: TOption) => {
    const lowerCaseTitle = option.title.toLowerCase();
    const firstKey = Object.keys(option.body)[0];

    if (lowerCaseTitle.includes(query) || (firstKey && firstKey.toLowerCase().includes(query))) {
      return true;
    }
    return false;
  });
};

const DropdownList: React.FC<TDropdownList> = ({
  setSelected,
  handleChange,
  setIsActive,
  searchResults,
  setSearchResults,
  selected_value,
}) => {
  const filteredOptions = filterOptions(playground_requests, searchResults);

  return (
    <div>
      <input
        autoFocus
        type='text'
        data-testid='searchInput'
        className={styles.dropdownSearch}
        onChange={(event) => {
          setSearchResults(event.target.value);
        }}
      />
      <div className={styles.dropdownList}>
        <div className={styles.dropdownSelect}>
          <span>Select API Call - Version 3</span>
        </div>
        <div className={styles.dropdownStart}>
          <span>ALL CALLS</span>
        </div>
        {filteredOptions.map((option) => (
          <div
            key={option.name}
            onClick={(e) => {
              setSelected(option.title);
              setIsActive(false);
              handleChange(e, option.name);
            }}
            className={clsx(styles.dropdownItem, {
              [styles.dropdownSelected]: selected_value === option.title,
            })}
            data-testid={`apiDropdownItems${option.name}`}
          >
            {option.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownList;
