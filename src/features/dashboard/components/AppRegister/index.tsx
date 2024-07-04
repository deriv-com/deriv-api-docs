import React, { useState } from 'react';
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

const TermsAndConditions: React.FC<TTermsAndConditionsProps> = ({ register, onChange }) => {
  return (
    <div className='app_register_container__tnc'>
      <CustomCheckbox id='tnc_approval' name='tnc_approval' register={register} onChange={onChange}>
        <label htmlFor={'tnc_approval'} className='app_register_container__tnc__label'>
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

export const RestrictionsComponent: React.FC<TRestrictionsComponentProps> = ({ error }) => {
  return (
    <div className='app_register_container__restrictions'>
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
  const [isTncChecked, setIsTncChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBaseRegisterAppForm>({
    mode: 'all',
    resolver: yupResolver(baseAppRegisterSchema),
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTncChecked(e.target.checked);
  };

  return (
    <form role={'form'} onSubmit={handleSubmit(submit)} className='app_register_container_form'>
      <div className='app_register_container'>
        <div className={`app_register_container__fields ${!isTncChecked ? 'error-border' : ''}`}>
          <div className='app_register_container__fields__input'>
            <input
              {...register('name')}
              placeholder={`Enter your app's name`}
              className='app_register_container_input'
            />
          </div>
          <div className='app_register_container__fields__button'>
            <Button
              color='coral'
              size='lg'
              variant='primary'
              role='submit'
              disabled={!isTncChecked}
              label='Register now'
            ></Button>
          </div>
        </div>
        {!isTncChecked && <span className='error'>You must accept the terms and conditions.</span>}
        <RestrictionsComponent error={errors.name?.message} />
        <TermsAndConditions register={register('tnc_approval')} onChange={handleCheckboxChange} />
      </div>
    </form>
  );
};

export default AppRegister;
