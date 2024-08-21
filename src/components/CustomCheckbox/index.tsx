import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './custom_checkbox.module.scss';

type TCustomCheckbox = {
  name: string;
  id: string;
  register: UseFormRegisterReturn;
  children: React.ReactNode;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSpanElement>,
  ) => void;
  checked?: boolean | undefined;
};

const CustomCheckbox = ({ name, id, register, children, onChange, checked }: TCustomCheckbox) => {
  return (
    <div className={styles.customCheckboxContainer} data-testid={`custom-checkbox-${name}`}>
      <div className={styles.checkboxContainer}>
        <input
          name={name}
          id={id}
          type='checkbox'
          checked={checked}
          {...register}
          onChange={onChange}
        />
        <span className={styles.customCheckbox} />
      </div>
      {children}
    </div>
  );
};

export default CustomCheckbox;
