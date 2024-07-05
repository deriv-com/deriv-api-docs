import React, { ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './custom_checkbox.module.scss';

type TCustomCheckbox = {
  name: string;
  id: string;
  register: UseFormRegisterReturn & {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => Promise<boolean | void>;
  };
  children: ReactElement;
};

const CustomCheckbox = ({ name, id, register, children }: TCustomCheckbox) => {
  return (
    <div className={styles.customCheckboxContainer} data-testid={`custom-checkbox-${name}`}>
      <div className={styles.checkboxContainer}>
        <input name={name} id={id} type='checkbox' {...register} />
        <span className={styles.customCheckbox} />
      </div>
      {children}
    </div>
  );
};

export default CustomCheckbox;
