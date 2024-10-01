import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { Button, Text } from '@deriv-com/quill-ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import useDeviceType from '@site/src/hooks/useDeviceType';
import {
  IBaseRegisterAppForm,
  TAppRegisterProps,
  TRestrictionsComponentProps,
  TTermsAndConditionsProps,
  baseAppRegisterSchema,
  app_name_error_map,
} from './types';
import './app-register.scss';

const TermsAndConditions: React.FC<TTermsAndConditionsProps> = ({ register }) => {
  return (
    <div className='app-register-container__tnc'>
      <CustomCheckbox id='tnc_approval' name='tnc_approval' register={register}>
        <label htmlFor='tnc_approval' className='app-register-container__tnc__label'>
          <Text>
            {translate({ message: `By registering your application, you acknowledge that you‘ve read and accepted the Deriv API`})} {' '}
            <a
              href='https://deriv.com/tnc/business-partners-api-user.pdf'
              target='_blank'
              rel='noreferrer'
            >
              <span><Translate>terms and conditions</Translate></span>
            </a>
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
              placeholder={translate({ message: `Enter your app's name` })}
              className='app_register_container_input'
            />
          </div>
          <div className='app-register-container__fields__button'>
            <Button
              color='coral'
              size={is_desktop ? 'lg' : 'md'}
              variant='primary'
              role='submit'
              disabled={has_error}
              label={translate({ message: 'Register now' })}
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
