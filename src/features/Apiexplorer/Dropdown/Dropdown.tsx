import React, { useState, useRef } from 'react';
import styles from './Dropdown.module.scss';
import clsx from 'clsx';
import DropdownList from './DropdownList';
import useOnClickOutside from '@site/src/hooks/useOnClickOutside';

export type TDropdown = {
  selected: string;
  setSelected: (value: string) => void;
  selected_value: string;
  handleChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => void;
};

export const Dropdown = ({ selected, setSelected, handleChange, selected_value }: TDropdown) => {
  const [isActive, setIsActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsActive(false));

  const handleToggleDropdown = () => {
    setIsActive(!isActive);
    setToggle(!toggle);
    setSearchResults('');
  };

  return (
    <div className={`${styles.dropdown} ${isActive && styles.active}`} ref={ref}>
      <div className={styles.dropdownBtn} onClick={handleToggleDropdown} data-testid='dropdown'>
        <span>{selected_value}</span>
        <span className={clsx(styles.arrow, { [styles.down]: isActive })} />
      </div>
      {isActive && (
        <div className={styles.dropdownContent}>
          <DropdownList
            selected_value={selected_value}
            handleChange={handleChange}
            selected={selected}
            setSelected={setSelected}
            searchResults={searchResults}
            setIsActive={setIsActive}
            setSearchResults={setSearchResults}
          />
        </div>
      )}
    </div>
  );
};
