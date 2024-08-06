import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  tokenRegisterSchema,
  ITokenRegisterForm,
  token_name_error_map,
  TRestrictionComponentProps,
} from './types';
import {
  Button,
  Heading,
  Text,
  TextField,
  SectionMessage,
  Modal,
  Checkbox,
} from '@deriv-com/quill-ui';
import useDeviceType from '@site/src/hooks/useDeviceType';
import './token-register.scss';
import { StandaloneCircleExclamationRegularIcon } from '@deriv/quill-icons';
import useDisableScroll from '../../hooks/useDisableScroll';
import AccountSwitcher from '@site/src/components/AccountSwitcher';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';

export const RestrictionComponent: React.FC<TRestrictionComponentProps> = ({ error }) => {
  return (
    <div className='token_register__restrictions'>
      <ul>
        <li className={error === token_name_error_map.error_code_1 ? 'error' : ''}>
          {token_name_error_map.error_code_1}
        </li>
        <li className={error === token_name_error_map.error_code_2 ? 'error' : ''}>
          {token_name_error_map.error_code_2}
        </li>
        <li className={error === token_name_error_map.error_code_3 ? 'error' : ''}>
          {token_name_error_map.error_code_3}
        </li>
        <li className={error === token_name_error_map.error_code_4 ? 'error' : ''}>
          {token_name_error_map.error_code_4}
        </li>
      </ul>
    </div>
  );
};

const TokenRegister: React.FC = () => {
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isAdminPopupVisible, setIsAdminPopupVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { deviceType } = useDeviceType();
  const { updateCurrentTab } = useAppManager();

  const initialValues = {
    read: false,
    trade: false,
    payments: false,
    trading_information: false,
    admin: false,
  };

  const methods = useForm<ITokenRegisterForm>({
    mode: 'all',
    criteriaMode: 'firstError',
    resolver: yupResolver(tokenRegisterSchema),
    defaultValues: initialValues,
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  useDisableScroll(isAdminPopupVisible);

  const onCancel = () => {
    updateCurrentTab(TDashboardTab.MANAGE_APPS);
  };

  const handlePopupCancel = () => {
    setIsAdminPopupVisible(false);
    setIsAdminChecked(false);
    setValue('admin', false, { shouldValidate: true, shouldDirty: true });
  };

  const handlePopupConfirm = () => {
    setIsAdminPopupVisible(false);
    setValue('admin', true, { shouldValidate: true, shouldDirty: true });
  };

  type name = 'read' | 'trade' | 'payments' | 'trading_information' | 'admin';

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValue(name, checked, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className='token_register__container'>
      <FormProvider {...methods}>
        <form className='formContent'>
          <div className='token_register__heading'>
            <Heading.H2>Create new token</Heading.H2>
          </div>
          <div className='token_register__account'>
            <Text>Select your account type:</Text>
            <div className='token_register__account__switcher'>
              <AccountSwitcher />
            </div>
          </div>
          <div className='token_register__scopes__text'>
            <Text>Select scopes based on the access you need:</Text>
          </div>
          <div className='token_register__scopes'>
            <div className='token_register__scopes__container'>
              <Checkbox
                className='demo_checkbox'
                label='Read'
                size='sm'
                onChange={handleCheckboxChange}
              />
              <label htmlFor='read-scope'>
                <Text>
                  This scope will allow third-party apps to view your account activity, settings,
                  limits, balance sheets, trade purchase history, and more.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox
                className='demo_checkbox'
                label='Trade'
                size='sm'
                onChange={handleCheckboxChange}
              />
              <label htmlFor='trade-scope'>
                <Text>
                  This scope will allow third-party apps to buy and sell contracts for you, renew
                  your expired purchases, and top up your demo accounts.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox
                className='demo_checkbox'
                label='Payments'
                size='sm'
                onChange={handleCheckboxChange}
              />
              <label htmlFor='payments-scope'>
                <Text>
                  This scope will allow third-party apps to withdraw to payment agents and make
                  inter-account transfers for you.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox
                className='demo_checkbox'
                label='Trading information'
                size='sm'
                onChange={handleCheckboxChange}
              />
              <label htmlFor='trading_information-scope'>
                <Text>This scope will allow third-party apps to view your trading history.</Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox
                className='demo_checkbox'
                label='Admin'
                size='sm'
                checked={isAdminChecked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsAdminChecked(e.target.checked);
                  if (e.target.checked) {
                    setIsAdminPopupVisible(true);
                  } else {
                    setIsAdminPopupVisible(false);
                    setIsAdminChecked(false);
                  }
                }}
              />
              <label htmlFor='admin-scope'>
                <Text>
                  This scope will allow third-party apps to open accounts for you, manage your
                  settings and token usage, and more.
                </Text>
              </label>
              <SectionMessage
                message={`Do not share tokens with the admin scope with unauthorised parties.`}
                size='md'
                status='warning'
                className='mst'
              />
            </div>
          </div>

          {errors.admin && <span className='error-message'>{errors.admin.message}</span>}

          <div className='token_register__inputfield'>
            <div className='token_register__name'>
              <TextField
                {...register('token_name')}
                label='Enter your token name'
                placeholder='Token name'
                inputSize='md'
                variant='outline'
              />
            </div>
            {errors?.token_name && errors?.token_name?.type === 'required' && (
              <span className='error-message'>{errors.token_name?.message}</span>
            )}
            <RestrictionComponent error={errors?.token_name?.message} />
          </div>
          <div className='token_register__actions'>
            <Button
              size='lg'
              variant='secondary'
              color='black'
              type='button'
              onClick={onCancel}
              label='Cancel'
            />
            <Button
              size='lg'
              variant='primary'
              role='submit'
              disabled={!isChecked || !isDirty}
              label='Create token'
            />
          </div>
        </form>
      </FormProvider>

      <Modal
        isOpened={isAdminPopupVisible}
        primaryButtonLabel='Enable admin access'
        secondaryButtonLabel='Cancel'
        primaryButtonCallback={handlePopupConfirm}
        secondaryButtonCallback={handlePopupCancel}
        isMobile={deviceType !== 'desktop'}
        showSecondaryButton
        showPrimaryButton
        shouldCloseOnSecondaryButtonClick
        className='admin-scope-modal'
        showHandleBar
        disableCloseOnOverlay={true}
      >
        <div className='adminScopePopup__icons'>
          <StandaloneCircleExclamationRegularIcon fill='var(--icon-color)' iconSize='2xl' />
        </div>
        <div className='adminScopePopup__content'>
          <Heading.H4>Enable admin access for your token?</Heading.H4>
          <Text>
            For better security, enable admin access only when it&apos;s necessary. This approach
            limits the scope of token access and prevents unauthorized usage.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default TokenRegister;
