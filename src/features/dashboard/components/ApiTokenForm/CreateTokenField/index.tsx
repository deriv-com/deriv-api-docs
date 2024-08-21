import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Text, Button, TextField } from '@deriv-com/quill-ui';
import styles from '../api-token.form.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';
import { FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';
import CustomErrors from './CustomErrors';
import TokenCreationDialogSuccess from '../../Dialogs/TokenCreationDialogSuccess';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import TokenNameRestrictions from '../../TokenNameRestrictions/TokenNameRestrictions';

type TCreateTokenField = {
  register: UseFormRegisterReturn;
  errors: Partial<
    FieldErrorsImpl<{
      read: boolean;
      trade: boolean;
      payments: boolean;
      trading_information: boolean;
      admin: boolean;
      name: string;
    }>
  >;
  form_is_cleared: boolean;
  setFormIsCleared: Dispatch<SetStateAction<boolean>>;
  setHideRestriction: Dispatch<SetStateAction<boolean>>;
  is_toggle: boolean;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
};

const CreateTokenField = ({
  errors,
  register,
  form_is_cleared,
  setFormIsCleared,
  setHideRestriction,
  is_toggle,
  setToggleModal,
}: TCreateTokenField) => {
  const { tokens } = useApiToken();
  const [input_value, setInputValue] = useState('');
  const numberOfTokens = tokens.length;

  useEffect(() => {
    if (form_is_cleared) {
      setInputValue('');
      setFormIsCleared(false);
    }
  }, [form_is_cleared]);

  const { updateCurrentTab } = useAppManager();

  const onCancel = () => {
    updateCurrentTab(TDashboardTab.MANAGE_TOKENS);
  };

  const getTokenNames = useMemo(() => {
    const token_names = [];
    for (const token_object of tokens) {
      const token_name = token_object.display_name.toLowerCase();
      token_names.push(token_name);
    }
    return token_names;
  }, [tokens]);

  const tokens_limit_reached = tokens.length === 30 && Object.keys(errors).length === 0;
  const token_name_exists =
    getTokenNames.includes(input_value.toLowerCase()) && Object.keys(errors).length === 0;
  const has_custom_errors = token_name_exists || (tokens_limit_reached && input_value !== '');
  const disable_button =
    token_name_exists || Object.keys(errors).length > 0 || input_value === '' || has_custom_errors;
  const error_border_active = token_name_exists || errors.name || has_custom_errors;

  useEffect(() => {
    if (error_border_active) {
      setHideRestriction(true);
    }
  }, [error_border_active, setHideRestriction]);
  return (
    <React.Fragment>
      <div
        onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
        className={`${styles.customTextInput} ${error_border_active ? 'error-border' : ''}`}
      >
        <div className={styles.textfield}>
          <TextField
            label='Enter your token name'
            placeholder='Token name'
            {...register}
            inputSize='md'
            variant='outline'
          />
        </div>
        {is_toggle && <TokenCreationDialogSuccess setToggleModal={setToggleModal} />}
      </div>
      {errors && errors.name && (
        <Text as='span' className='error-message'>
          {errors.name.message}
        </Text>
      )}
      <CustomErrors
        token_name_exists={token_name_exists}
        tokens_limit_reached={tokens_limit_reached}
        input_value={input_value}
      />
      <TokenNameRestrictions />
      <div className={styles.token_actions_register}>
        <Button
          size='lg'
          variant='secondary'
          color='black'
          type='button'
          onClick={onCancel}
          label='Cancel'
        />
        <Button
          data-testid='create-token-button'
          role='button'
          size='lg'
          variant='primary'
          disabled={disable_button}
          type='submit'
          label='Create token'
        />
      </div>
    </React.Fragment>
  );
};

export default CreateTokenField;
