import React from 'react';
import { Button } from '@deriv-com/quill-ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './app-register.scss';
import {
  IBaseRegisterAppForm,
  TAppRegisterProps,
  TRestrictionsComponentProps,
  TTermsAndConditionsProps,
  baseAppRegisterSchema,
  app_name_error_map,
} from './types';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import useDeviceType from '@site/src/hooks/useDeviceType';

const TermsAndConditions: React.FC<TTermsAndConditionsProps> = ({ register }) => {
  return (
    <div className='app-register-container__tnc'>
      <CustomCheckbox id='tnc_approval' name='tnc_approval' register={register}>
        <label htmlFor={'tnc_approval'} className='app-register-container__tnc__label'>
          By registering your application, you acknowledge that you&lsquo;ve read and accepted the
          Deriv API{' '}
          <a
            href='https://deriv.com/tnc/business-partners-api-user.pdf'
            target='_blank'
            rel='noreferrer'
          >
            <span>terms and conditions</span>
          </a>
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

const AppRegister: React.FC<TAppRegisterProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBaseRegisterAppForm>({
    mode: 'all',
    resolver: yupResolver(baseAppRegisterSchema),
  });
  const has_error = Object.entries(errors).length !== 0;
  const { deviceType } = useDeviceType();
  const is_desktop = deviceType === 'desktop';

  return (
    <form role={'form'} onSubmit={handleSubmit(submit)} className='app-register-container_form'>
      <div className='app-register-container'>
        <div className={`${has_error && 'error-border'} app-register-container__fields`}>
          <div className='app-register-container__fields__input'>
            <input
              {...register('name')}
              placeholder={`Enter your app's name`}
              className='app-register-container__input'
            />
          </div>
          <div className='app-register-container__fields__button'>
            <Button
              color='coral'
              size={is_desktop ? 'lg' : 'md'}
              variant='primary'
              role='submit'
              disabled={has_error}
              label='Register now'
            ></Button>
          </div>
        </div>
        <span className='error'>{errors?.tnc_approval?.message}</span>
        <Restrictions error={errors?.name?.message} />
        <TermsAndConditions register={register('tnc_approval')} />
      </div>
    </form>
  );
};

export default AppRegister;
