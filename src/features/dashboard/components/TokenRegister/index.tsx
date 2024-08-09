import React, { useEffect, useMemo, useState } from 'react';
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
import useApiToken from '@site/src/hooks/useApiToken';
import CustomErrors from '../ApiTokenForm/CreateTokenField/CustomErrors';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';

export const RestrictionComponent: React.FC<TRestrictionComponentProps> = ({ error }) => (
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

const TokenRegister: React.FC = () => {
  const [input_value, setInputValue] = useState('');
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isAdminPopupVisible, setIsAdminPopupVisible] = useState(false);
  const { deviceType } = useDeviceType();
  const { tokens } = useApiToken();
  const { updateCurrentTab } = useAppManager();

  const onCancel = () => {
    updateCurrentTab(TDashboardTab.MANAGE_APPS);
  };

  const methods = useForm<ITokenRegisterForm>({
    mode: 'all',
    resolver: yupResolver(tokenRegisterSchema),
    defaultValues: {
      read: false,
      trade: false,
      payments: false,
      trading_information: false,
      admin: false,
    },
  });

  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  useDisableScroll(isAdminPopupVisible);

  const getTokenNames = useMemo(() => {
    return tokens.map((token) => token.display_name.toLowerCase());
  }, [tokens]);

  const tokens_limit_reached = tokens.length === 30 && !errors.token_name;
  const token_name_exists = getTokenNames.includes(input_value.toLowerCase()) && !errors.token_name;
  const has_custom_errors = token_name_exists || (tokens_limit_reached && input_value !== '');
  const disable_button =
    token_name_exists || Object.keys(errors).length > 0 || input_value === '' || has_custom_errors;
  const error_border_active = token_name_exists || errors.token_name || has_custom_errors;

  useEffect(() => {
    setInputValue(watch('token_name') || '');
  }, [watch('token_name')]);

  useEffect(() => {
    if (error_border_active) {
      setIsAdminChecked(false);
    }
  }, [error_border_active]);

  const handlePopupCancel = () => {
    setIsAdminPopupVisible(false);
    setIsAdminChecked(false);
    methods.setValue('admin', false);
  };

  const handlePopupConfirm = () => {
    setIsAdminPopupVisible(false);
    methods.setValue('admin', true);
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
              <Checkbox className='demo_checkbox' label='Read' size='sm' />
              <label htmlFor='read-scope'>
                <Text>
                  This scope will allow third-party apps to view your account activity, settings,
                  limits, balance sheets, trade purchase history, and more.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox className='demo_checkbox' label='Trade' size='sm' />
              <label htmlFor='trade-scope'>
                <Text>
                  This scope will allow third-party apps to buy and sell contracts for you, renew
                  your expired purchases, and top up your demo accounts.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox className='demo_checkbox' label='Payments' size='sm' />
              <label htmlFor='payments-scope'>
                <Text>
                  This scope will allow third-party apps to withdraw to payment agents and make
                  inter-account transfers for you.
                </Text>
              </label>
            </div>
            <div className='token_register__scopes__container'>
              <Checkbox className='demo_checkbox' label='Trading information' size='sm' />
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

          <div className='token_register__inputfield'>
            <TextField
              label='Enter your token name'
              placeholder='Token name'
              {...register('token_name')}
              inputSize='md'
              variant='outline'
              error={error_border_active}
            />
            <CustomErrors
              token_name_exists={token_name_exists}
              tokens_limit_reached={tokens_limit_reached}
              input_value={input_value}
            />
            {errors?.token_name && (
              <span className='error-message'>{errors.token_name.message}</span>
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
              type='button'
              label='Create token'
              disabled={disable_button}
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
          <Heading.H4>Are you sure you want to enable admin scope for your token?</Heading.H4>
          <Text>
            Granting admin access gives your token full control over your account and increases
            security risks. We recommend granting this level of access only when it's essential.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default TokenRegister;
