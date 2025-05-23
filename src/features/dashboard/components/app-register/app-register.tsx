import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Translate, { translate } from '@docusaurus/Translate';
import { ApplicationObject } from '@deriv/api-types';
import { Button, Link, Text } from '@deriv-com/quill-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import useDeviceType from '@site/src/hooks/useDeviceType';
import useWS from '@site/src/hooks/useWs';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import {
  IBaseRegisterAppForm,
  TRestrictionsComponentProps,
  TTermsAndConditionsProps,
  baseAppRegisterSchema,
  app_name_error_map,
} from './types';
import './app-register.scss';

import AppRegisterSuccessModal from '../app-register-success-modal';

const TermsAndConditions: React.FC<TTermsAndConditionsProps> = ({ register }) => {
  return (
    <div className='app-register-container__tnc'>
      <CustomCheckbox id='tnc_approval' name='tnc_approval' register={register}>
        <label htmlFor='tnc_approval' className='app-register-container__tnc__label'>
          <Text>
            {translate({
              message: `By registering your application, you acknowledge that you‘ve read and accepted the Deriv API`,
            })}{' '}
            <Link
              href='https://deriv.com/tnc/business-partners-api-user.pdf'
              target='_blank'
              rel='noreferrer'
              className='app-register-container__tnc__link'
            >
              <Translate>terms and conditions</Translate>
            </Link>
            {translate({ message: 'and General Business Partners' })}{' '}
            <Link
              href='https://docs.deriv.com/tnc/business-partners-general-terms.pdf'
              target='_blank'
              rel='noreferrer'
              className='app-register-container__tnc__link'
            >
              <Translate>terms and conditions</Translate>
            </Link>
          </Text>
        </label>
      </CustomCheckbox>
    </div>
  );
};

export const Restrictions: React.FC<TRestrictionsComponentProps> = ({ error }) => {
  return (
    <div className='app-register-container__restrictions'>
      <ul>
        <li className={error === app_name_error_map.error_code_1 ? 'error' : ''}>
          {app_name_error_map.error_code_1}
        </li>
        <li className={error === app_name_error_map.error_code_2 ? 'error' : ''}>
          {app_name_error_map.error_code_2}
        </li>
        <li className={error === app_name_error_map.error_code_3 ? 'error' : ''}>
          {app_name_error_map.error_code_3}
        </li>
      </ul>
    </div>
  );
};

const AppRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IBaseRegisterAppForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(baseAppRegisterSchema),
  });

  const has_error = Object.entries(errors).length !== 0;
  const watchedValues = watch();
  const name_value = watchedValues.name || '';
  const tnc_approval = watchedValues.tnc_approval || false;
  const is_button_disabled = has_error || !name_value || !tnc_approval;

  const { deviceType } = useDeviceType();
  const is_desktop = deviceType === 'desktop';
  const { setAppRegisterModalOpen, updateCurrentTab, getApps, handleCurrentUpdatingItem, apps } =
    useAppManager();
  const { send: registerApp, data, error, clear, is_loading } = useWS('app_register');
  const [created_app_data, setCreatedAppData] = useState({});

  useEffect(() => {
    if (!is_loading && data?.name && !error) {
      setAppRegisterModalOpen(true);
      setCreatedAppData(data);
      clear();
    }
  }, [data, clear, error, setAppRegisterModalOpen, is_loading, getApps]);

  const submit = useCallback(
    (data) => {
      const { name } = data;
      registerApp({
        name,
        scopes: [],
      });
    },
    [registerApp],
  );

  const handleAppConfigure = () => {
    setAppRegisterModalOpen(false);
    handleCurrentUpdatingItem(created_app_data as ApplicationObject);
    getApps();
    updateCurrentTab(TDashboardTab.UPDATE_APP);
  };

  const handleConfigureLater = () => {
    setAppRegisterModalOpen(false);
    getApps();
    updateCurrentTab(TDashboardTab.MANAGE_APPS);
  };

  const handleErrorOnChange = () => {
    if (error) {
      clear();
    }
  };

  return (
    <>
      <form role={'form'} onSubmit={handleSubmit(submit)} className='app-register-container_form'>
        <div className='app-register-container'>
          <div className={`${has_error && 'error-border'} app-register-container__fields`}>
            <div className='app-register-container__fields__input'>
              <input
                {...register('name', {
                  onChange: (e) => {
                    handleErrorOnChange();
                  },
                })}
                placeholder={translate({ message: `Enter your app's name` })}
                className='app-register-container__input'
              />
            </div>
          </div>
          <span className='error'>{errors?.tnc_approval?.message || error?.error?.message}</span>

          <Restrictions error={errors?.name?.message} />
          <TermsAndConditions register={register('tnc_approval')} />
          <div className='app-register-container__wrap-button'>
            <Button
              variant='secondary'
              size={is_desktop ? 'lg' : 'md'}
              color='black'
              type='button'
              disabled={!apps?.length}
              onClick={() => {
                updateCurrentTab(TDashboardTab.MANAGE_APPS);
              }}
            >
              <Translate>Cancel</Translate>
            </Button>

            <Button
              color='coral'
              size={is_desktop ? 'lg' : 'md'}
              variant='primary'
              role='submit'
              disabled={is_button_disabled}
              label={translate({ message: 'Register now' })}
            ></Button>
          </div>
        </div>
      </form>
      <AppRegisterSuccessModal onCancel={handleConfigureLater} onConfigure={handleAppConfigure} />
    </>
  );
};

export default AppRegister;
