import React, { useState, useRef, ReactElement } from 'react';
import useOnClickOutside from '@site/src/hooks/useOnClickOutside';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './custom_select_dropdown.module.scss';

type TCustomSelectDropdown = {
  children: ReactElement[];
  label: string;
  value: string;
  register: UseFormRegisterReturn;
  is_error?: boolean;
};

const CustomSelectDropdown = ({
  children,
  label,
  register,
  value,
  is_error = false,
}: TCustomSelectDropdown) => {
  const [is_toggle_dropdown, setToggleDropdown] = useState(false);
  const toggle_dropdown = is_toggle_dropdown ? styles.active : styles.inactive;

  const SelectInput = () => children[0];
  const SelectDropdown = () => children[1];
  const ErrorMessage = () => children[2];

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setToggleDropdown(false));

  return (
    <div className={styles.customSelectField}>
      <div
        tabIndex={0}
        ref={dropdownRef}
        onClick={(e) => setToggleDropdown((prev) => !prev)}
        onKeyDown={(e) => e.key === 'ArrowDown' && setToggleDropdown((prev) => !prev)}
        className={`${styles.selectWrapper} ${toggle_dropdown} ${is_error ? styles.error : ''}`}
        data-testid={`dt_custom_dropdown_${value}`}
      >
        <label className={`${styles.selectLabel} ${value ? styles.active : ''}`}>{label}</label>
        <SelectInput />
        <input {...register} type='hidden' value={value ? value : ''} />
        <div className={`${styles.dropdownWrapper} ${toggle_dropdown}`}>
          <div className={styles.dropdown} onClick={(e) => setToggleDropdown((prev) => !prev)}>
            <SelectDropdown />
          </div>
        </div>
      </div>
      {is_error && <ErrorMessage />}
    </div>
  );
};

export default CustomSelectDropdown;
