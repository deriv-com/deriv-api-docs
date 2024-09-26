import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appEditSchema, IRegisterAppForm } from '../../types';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import { Button, Heading, Text, TextField, SectionMessage, Modal } from '@deriv-com/quill-ui';
import { Restrictions } from '../../components/app-register/app-register';
import StepperTextField from '../../components/stepper-text-field';
import useDeviceType from '@site/src/hooks/useDeviceType';
import { StandaloneCircleExclamationRegularIcon } from '@deriv/quill-icons';
import useDisableScroll from '../../hooks/useDisableScroll';
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
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isAdminPopupVisible, setIsAdminPopupVisible] = useState(false);
  const { deviceType } = useDeviceType();

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

  useDisableScroll(isAdminPopupVisible);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'admin') {
      setIsAdminChecked(checked);
      if (checked) {
        setIsAdminPopupVisible(true);
      } else {
        setIsAdminPopupVisible(false);
      }
      setValue('admin', checked, { shouldValidate: true, shouldDirty: true });
    }
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
    <div className='update_form'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)} className='formContent'>
          <Heading.H5 className='mb_sm'>App’s name</Heading.H5>
          <Text size='md' className='mb_md'>
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
          <Text size='sm'>
            <Restrictions error={errors?.name?.message} />
          </Text>

          <Heading.H5 className='mb_sm mst'>Markup</Heading.H5>
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

          <Heading.H5 className='mt mb_sm'>OAuth settings</Heading.H5>
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
            <Heading.H5 className='mb_lg mt_sm'>URL Configuration</Heading.H5>
            <Text size='md' className='formsubHeading mb_md'>
              To set up OAuth for your app, specify the URL where users should be redirected after
              authorisation.
            </Text>

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

            <Text size='md' className='formsubHeading mblk'>
              If your app includes verification logic, enter the email verification URL below (e.g.
              for account opening, verification, and password reset):
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
              <Text size='sm' className='explanation'>
                If provided, the verification URL will be appended with a token and sent to the
                user&apos;s email. Otherwise, the authorisation URL with the token will be used.
              </Text>
            </Explanations>

            <div className='scopes' id='register_scopes'>
              <div className='formHeaderContainer mt_lg mb_sm'>
                <Heading.H5>Scopes of authorisation</Heading.H5>
                <Text size='md' className='formsubHeading'>
                  Select the scope for your app:
                </Text>
              </div>

              <div className='scopesWrapper'>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox name='read' id='read-scope' register={register('read')}>
                    <label htmlFor='read-scope'>
                      <Text size='md'>
                        <b>Read</b>: You&apos;ll have full access to your clients&apos; information.
                      </Text>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox name='trade' id='trade-scope' register={register('trade')}>
                    <label htmlFor='trade-scope'>
                      <Text size='md'>
                        <b>Trade</b>: You&apos;ll be able to buy and sell contracts on your
                        clients&apos; behalf.
                      </Text>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox
                    name='trading_information'
                    id='trading_information-scope'
                    register={register('trading_information')}
                  >
                    <label htmlFor='trading_information-scope'>
                      <Text size='md'>
                        <b>Trading information</b>: You&lsquo;ll be able to view your clients&rsquo;
                        trading information, including their account balance.
                      </Text>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper'>
                  <CustomCheckbox
                    name='payments'
                    id='payments-scope'
                    register={register('payments')}
                  >
                    <label htmlFor='payments-scope'>
                      <Text size='md'>
                        <b>Payments</b>: You&apos;ll be able to perform deposits and withdrawals on
                        your clients&apos; behalf.
                      </Text>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className='customCheckboxWrapper mb-0'>
                  <CustomCheckbox
                    name='admin'
                    id='admin-scope'
                    register={{
                      ...register('admin'),
                    }}
                    onChange={handleCheckboxChange}
                  >
                    <label htmlFor='admin-scope'>
                      <Text size='md'>
                        <b>Admin</b>: Full account access, including the access to manage security
                        tokens.
                      </Text>
                    </label>
                  </CustomCheckbox>
                </div>
              </div>
              <SectionMessage
                message={`Grant admin access only when it’s essential for your app's workflow.`}
                size='md'
                className='mst'
                status='warning'
              />
            </div>
          </div>

          <div className='update_form__fields_button mt'>
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
        isMobile={deviceType !== 'desktop'}
        showSecondaryButton
        primaryButtonCallback={handlePopupConfirm}
        shouldCloseOnSecondaryButtonClick
        className='admin-scope-modal'
        showHandleBar
        disableCloseOnOverlay={true}
        showCrossIcon={false}
      >
        <div className='modal__icon' style={{ background: 'var(--core-color-solid-yellow-100)' }}>
          <StandaloneCircleExclamationRegularIcon fill='var(--icon-color)' iconSize='2xl' />
        </div>
        <div className='modal__content'>
          <Heading.H4>Enable admin access for your app?</Heading.H4>
          <Text>
            For better security, enable admin access only when it&apos;s necessary. This approach
            limits access to client activities, minimising risks and safeguarding both workflow
            efficiency and client trust.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default AppUpdateForm;
