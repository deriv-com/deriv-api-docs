import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@deriv-com/quill-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import {
  IBaseRegisterAppForm,
  TAppRegisterProps,
  TRestrictionsComponentProps,
  TTermsAndConditionsProps,
  baseAppRegisterSchema,
  app_name_error_map,
} from './types';
import './app-register.scss';
import Translate, { translate } from '@docusaurus/Translate';

const TermsAndConditions: React.FC<TTermsAndConditionsProps> = ({ register }) => {
  return (
    <div className='app_register_container__tnc'>
      <CustomCheckbox id='tnc_approval' name='tnc_approval' register={register}>
        <label htmlFor={'tnc_approval'} className='app_register_container__tnc__label'>
          <Translate>
            By registering your application, you acknowledge that you&lsquo;ve read and accepted the
            Deriv API
          </Translate>{' '}
          <a
            href='https://deriv.com/tnc/business-partners-api-user.pdf'
            target='_blank'
            rel='noreferrer'
          >
            <span>
              <Translate>terms and conditions</Translate>
            </span>
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBaseRegisterAppForm>({
    mode: 'all',
    resolver: yupResolver(baseAppRegisterSchema),
  });
  const has_error = Object.entries(errors).length !== 0;
  return (
    <form role={'form'} onSubmit={handleSubmit(submit)} className='app_register_container_form'>
      <div className='app_register_container'>
        <div className={`${has_error && 'error-border'} app_register_container__fields`}>
          <div className='app_register_container__fields__input'>
            <input
              {...register('name')}
              placeholder={translate({ message: `Enter your app's name` })}
              className='app_register_container_input'
            />
          </div>
          <div className='app_register_container__fields__button'>
            <Button
              color='coral'
              size='lg'
              variant='primary'
              role='submit'
              disabled={has_error}
              label={translate({ message: 'Register now' })}
            ></Button>
          </div>
        </div>
        <span className='error'>{errors?.tnc_approval?.message}</span>
        <RestrictionsComponent error={errors?.name?.message} />
        <TermsAndConditions register={register('tnc_approval')} />
      </div>
    </form>
  );
};
export default AppRegister;
