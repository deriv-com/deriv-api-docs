import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { tokenRegisterSchema, ITokenRegisterForm, TTokenRegisterProps } from './types';
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
import useAccountSelector from '@site/src/hooks/useAccountSelector';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';

const TokenRegister: React.FC = () => {
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isAdminPopupVisible, setIsAdminPopupVisible] = useState(false);
  const { deviceType } = useDeviceType();
  const { selectedAccount, selectAccount } = useAccountSelector();
  const { updateCurrentTab } = useAppManager();

  const methods = useForm<ITokenRegisterForm>({
    mode: 'all',
    criteriaMode: 'firstError',
    resolver: yupResolver(tokenRegisterSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
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

  return (
    <div className='token_register__container'>
      <FormProvider {...methods}>
        <form className='formContent'>
          <div className='token_register__heading'>
            <Heading.H2>Create new token</Heading.H2>
          </div>
          <div className='token_register__account'>
            <Text>Select your account type:</Text>
            <AccountSwitcher onSelect={selectAccount} />
          </div>
          <div className='token_register__scopes__text'>
            <Text>Select scopes based on the access you need:</Text>
          </div>
          <div className='token_register__scopes'>
            <div className='token_register__scopes__container'>
              <Checkbox className='demo_checkbox' checkboxPosition='left' label='Read' size='sm' />
              <label htmlFor='read-scope'>
                <Text>
                  This scope will allow third-party apps to view your account activity, settings,
                  limits, balance sheets, trade purchase history, and more.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox checkboxPosition='left' className='demo_checkbox' label='Trade' size='sm' />
              <label htmlFor='trade-scope'>
                <Text>
                  This scope will allow third-party apps to buy and sell contracts for you, renew
                  your expired purchases, and top up your demo accounts.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox
                checkboxPosition='left'
                className='demo_checkbox'
                label='Payments'
                size='sm'
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
                checkboxPosition='left'
                className='demo_checkbox'
                label='Trading information'
                size='sm'
              />
              <label htmlFor='trading_information-scope'>
                <Text>This scope will allow third-party apps to view your trading history.</Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox
                checkboxPosition='left'
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
              {errors.token_name && (
                <span className='error-message'>{errors.token_name.message}</span>
              )}
            </div>
            {
              <ul className='token_register__restrictions'>
                <Text size='sm'>
                  <li>Only alphanumeric characters with spaces and underscores are allowed.</li>
                  <li>Only 2-32 characters are allowed.</li>
                  <li>No duplicate token names are allowed for the same account.</li>
                  <li>
                    No keywords "deriv" or "binary" or words that look similar, e.g. "_binary_" or
                    "deriv" are allowed.
                  </li>
                </Text>
              </ul>
            }
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
              disabled={!isDirty}
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
          <StandaloneCircleExclamationRegularIcon fill='#C47D00' iconSize='2xl' />
        </div>
        <div className='adminScopePopup__content'>
          <Heading.H4>Enable admin access for your token?</Heading.H4>
          <Text>
            For better security, enable admin access only when it&apos;s necessary. This approach
            limits access to client activities, minimizing risks and safeguarding both workflow
            efficiency and client trust.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default TokenRegister;
