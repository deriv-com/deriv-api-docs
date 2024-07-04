import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appEditSchema, IRegisterAppForm } from '../../types';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import { Button, Heading, Text, TextField, SectionMessage, Modal } from '@deriv-com/quill-ui';
import { RestrictionsComponent } from '../../components/AppRegister';
import StepperTextField from '../../components/StepperTextField';
import './app-update-form.scss';

type TAppFormProps = {
  initialValues?: Partial<IRegisterAppForm>;
  submit: (data: IRegisterAppForm) => void;
  onCancel?: () => void;
  is_loading?: boolean;
};

const Explanations: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='app_register_container__restrictions'>{children}</div>;
};

const UnderlinedLink: React.FC<{ text: string; linkTo: string }> = ({ text, linkTo }) => {
  return (
    <a className='underlined_link' href={linkTo}>
      {text}
    </a>
  );
};

const AppUpdateForm = ({ initialValues, submit, onCancel, is_loading }: TAppFormProps) => {
  const [isAdminPopupVisible, setIsAdminPopupVisible] = useState(false);
  const [isAdminSelected, setIsAdminSelected] = useState(initialValues?.admin || false);
  const [isMobile, setIsMobile] = useState(false);

  const methods = useForm<IRegisterAppForm>({
    mode: 'all',
    criteriaMode: 'firstError',
    resolver: yupResolver(appEditSchema),
    defaultValues: initialValues,
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = methods;

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAdminScopeChange = (e) => {
    if (e.target.checked) {
      setIsAdminPopupVisible(true);
    } else {
      setIsAdminSelected(false);
      setValue('admin', false, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handlePopupCancel = () => {
    setIsAdminPopupVisible(false);
    setIsAdminSelected(false);
    setValue('admin', false, { shouldValidate: true, shouldDirty: true });
  };

  const handlePopupConfirm = () => {
    setIsAdminPopupVisible(false);
    setIsAdminSelected(true);
    setValue('admin', true, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className='update_form'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)} className='formContent'>
          <div>
            <Heading.H5>App’s name</Heading.H5>
            <Text size='md' className='mb'>
              Enter the name of the application you want to register:
            </Text>

            <TextField
              {...register('name')}
              label='App’s name'
              placeholder='App’s name'
              inputSize='md'
              variant='outline'
              value={initialValues?.name}
            />
            {errors?.name && errors?.name?.type === 'required' && (
              <span className='error-message'>{errors.name?.message}</span>
            )}
            <RestrictionsComponent error={errors?.name?.message} />
          </div>

          <Heading.H5 className='mst'>Markup</Heading.H5>
          <Text size='md'>
            Add a markup to the price of each trade to help you earn a commission. Enter your markup
            percentage below. Learn more about markup calculations in our detailed{' '}
            <UnderlinedLink text='documentation' linkTo={'/docs/intro/'} />.
          </Text>
          <SectionMessage
            message={`Markup is only available for real accounts and trading applications.`}
            size='md'
            status='info'
            className='mblk'
          />
          <StepperTextField
            name='app_markup_percentage'
            handleOnMinusClick={() => {
              setValue(
                'app_markup_percentage',
                Number((Number(getValues('app_markup_percentage')) - 0.1).toFixed(2)),
                {
                  shouldValidate: true,
                  shouldDirty: true,
                },
              );
            }}
            handleOnPlusClick={() => {
              setValue(
                'app_markup_percentage',
                Number((Number(getValues('app_markup_percentage')) + 0.1).toFixed(2)),
                {
                  shouldValidate: true,
                  shouldDirty: true,
                },
              );
            }}
            min={0}
            max={3}
            error={errors?.app_markup_percentage}
          />
          {errors?.app_markup_percentage && (
            <span className='error-message'>{errors.app_markup_percentage?.message}</span>
          )}

          <Heading.H5 className='mst mb'>OAuth settings</Heading.H5>
          <Text size='md'>
            Log in to your app using your Deriv account without an API token. With OAuth,
            third-party applications can securely authorise access without requiring password
            sharing, enhancing both security and user control.
          </Text>
          <SectionMessage
            message={
              <ul className='update_form__oauth_info'>
                <li>Use OAuth if your application requires other users to sign in.</li>
                <li>Authorisation URL is mandatory to enable OAuth on your app.</li>
              </ul>
            }
            size='md'
            status='info'
            className='mblk'
          />
          <div className='update_form__oauth_container'>
            <div>
              <Heading.H5 className='mblk'>URL Configuration</Heading.H5>
              <Text size='md' className='formsubHeading mb'>
                To set up OAuth for your app, specify the URL where users should be redirected after
                authorisation.
              </Text>
            </div>

            <div>
              <TextField
                {...register('redirect_uri')}
                id='app_redirect_uri'
                label='Authorisation URL'
                placeholder='Authorisation URL'
                inputSize='md'
                variant='outline'
                className='uri_input'
                value={initialValues?.redirect_uri}
              />
              {errors && errors?.redirect_uri && (
                <span className='error-message'>{errors.redirect_uri?.message}</span>
              )}
            </div>

            <div>
              <Text size='md' className='formsubHeading mblk'>
                If your app includes verification logic, enter the email verification URL below
                (e.g. for account opening, verification, and password reset):
              </Text>
              <TextField
                {...register('verification_uri')}
                id='app_verification_uri'
                label='Verification URL (optional)'
                placeholder='Verification URL (optional)'
                inputSize='md'
                variant='outline'
                className='uri_input'
                value={initialValues?.verification_uri}
              />
              {errors && errors.verification_uri && (
                <span className='error-message'>{errors.verification_uri.message}</span>
              )}
              <Explanations>
                If provided, the verification URL will be appended with a token and sent to the
                user&apos;s email. Otherwise, the authorisation URL with the token will be used.
              </Explanations>
            </div>

            <div className='scopes' id='register_scopes'>
              <div>
                <div className='formHeaderContainer mb'>
                  <Heading.H5>Scopes of authorisation</Heading.H5>
                  <Text size='md' className='formsubHeading'>
                    Select the scope for your app:
                  </Text>
                </div>
              </div>

              <div className='scopesWrapper'>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox
                    name='read'
                    id='read-scope'
                    register={register('read')}
                    onChange={(e) => {
                      setValue('read', e.target.checked, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    <label htmlFor='read-scope'>
                      <b>Read</b>: You&apos;ll have full access to your clients&apos; information.
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox
                    name='trade'
                    id='trade-scope'
                    register={register('trade')}
                    onChange={(e) => {
                      setValue('trade', e.target.checked, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    <label htmlFor='trade-scope'>
                      <b>Trade</b>: You&apos;ll be able to buy and sell contracts on your
                      clients&apos; behalf.
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox
                    name='trading_information'
                    id='trading_information-scope'
                    register={register('trading_information')}
                    onChange={(e) => {
                      setValue('trading_information', e.target.checked, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    <label htmlFor='trading_information-scope'>
                      <b>Trading information</b>: You&lsquo;ll be able to view your clients&rsquo;
                      trading information, including their account balance.
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox
                    name='payments'
                    id='payments-scope'
                    register={register('payments')}
                    onChange={(e) => {
                      setValue('payments', e.target.checked, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    <label htmlFor='payments-scope'>
                      <b>Payments</b>: You&apos;ll be able to process your clients&rsquo; payments.
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper mb-0'>
                  <CustomCheckbox
                    name='admin'
                    id='admin-scope'
                    register={register('admin')}
                    checked={isAdminSelected}
                    onChange={handleAdminScopeChange}
                  >
                    <label htmlFor='admin-scope'>
                      <b>Admin</b>: Full account access, including the access to manage security
                      tokens.
                    </label>
                  </CustomCheckbox>
                </div>

                <SectionMessage
                  message={`Grant admin access only when it’s essential for your app's workflow.`}
                  size='md'
                  status='warning'
                  className='mblk'
                />
              </div>
            </div>
          </div>

          <div className='update_form__fields_button'>
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
              disabled={is_loading || !isDirty}
              label='Update application'
            />
          </div>
        </form>
      </FormProvider>

      <Modal
        isOpened={isAdminPopupVisible}
        toggleModal={handlePopupCancel}
        primaryButtonLabel='Enable admin access'
        secondaryButtonLabel='Cancel'
        isMobile={!isMobile}
        showSecondaryButton
        primaryButtonCallback={handlePopupConfirm}
        shouldCloseOnSecondaryButtonClick
        className='admin-scope-modal'
        showHandleBar
        disableCloseOnOverlay={true}
      >
        <div className='adminScopePopup__icons'>
          <img src='img/exclamation_warning.svg' className='image' alt='exclamation warning' />
        </div>
        <div className='adminScopePopup__content'>
          <Heading.H4>Enable admin access for your app?</Heading.H4>
          <Text>
            For better security, enable admin access only when it's necessary. This approach limits
            access to client activities, minimising risks and safeguarding both workflow efficiency
            and client trust.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default AppUpdateForm;
