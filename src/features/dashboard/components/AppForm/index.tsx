import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Button, Text } from '@deriv/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appRegisterSchema, appEditSchema, IRegisterAppForm } from '../../types';
import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import CustomSelectDropdown from '@site/src/components/CustomSelectDropdown';
import SelectedToken from '@site/src/components/CustomSelectDropdown/token-dropdown/SelectedToken';
import TokenDropdown from '@site/src/components/CustomSelectDropdown/token-dropdown/TokenDropdown';
import SelectedAccount from '@site/src/components/CustomSelectDropdown/account-dropdown/SelectedAccount';
import AccountDropdown from '@site/src/components/CustomSelectDropdown/account-dropdown/AccountDropdown';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import styles from './app-form.module.scss';
import clsx from 'clsx';
import useAppManager from '@site/src/hooks/useAppManager';
import useWS from '@site/src/hooks/useWs';
import RestrictionsAppname from '../RestrictionsAppname';
import Translate from '@docusaurus/Translate';

type TAppFormProps = {
  initialValues?: Partial<IRegisterAppForm>;
  isUpdating?: boolean;
  submit: (data: IRegisterAppForm) => void;
  is_update_mode?: boolean;
  form_is_cleared?: boolean;
  setFormIsCleared?: Dispatch<SetStateAction<boolean>>;
  cancelButton?: () => ReactNode;
};

const AppForm = ({
  initialValues,
  submit,
  is_update_mode = false,
  form_is_cleared,
  setFormIsCleared,
  cancelButton,
}: TAppFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterAppForm>({
    mode: 'all',
    criteriaMode: 'firstError',
    resolver: yupResolver(is_update_mode ? appEditSchema : appRegisterSchema),
    defaultValues: initialValues,
  });

  const { currentToken, tokens } = useApiToken();
  const { currentLoginAccount } = useAuthContext();
  const { getApps, apps } = useAppManager();
  const [input_value, setInputValue] = useState('');
  const { is_loading } = useWS('app_register');

  useEffect(() => {
    if (form_is_cleared) {
      setInputValue('');
      setFormIsCleared(false);
      reset();
    }
    getApps();
  }, [form_is_cleared, getApps]);

  const [display_restrictions, setDisplayRestrictions] = useState(true);

  const admin_token = currentToken?.scopes?.includes('admin') && currentToken.token;

  const appNamesArray = apps?.map((app) => app.name);
  const app_name_exists = appNamesArray?.includes(input_value);
  const disable_register_btn =
    app_name_exists || input_value === '' || Object.keys(errors).length > 0 || is_loading;
  const disable_btn = is_update_mode ? is_loading : disable_register_btn;
  const error_border_active = (!is_update_mode && app_name_exists) || errors.name;

  useEffect(() => {
    errors.name?.message || app_name_exists
      ? setDisplayRestrictions(false)
      : setDisplayRestrictions(true);
  }, [errors.name?.message, app_name_exists]);

  const accountHasAdminToken = () => {
    const admin_check_array = [];
    tokens.forEach((token) => {
      const has_admin_scope = token.scopes && token.scopes.includes('admin');
      has_admin_scope ? admin_check_array.push(true) : admin_check_array.push(false);
    });
    return admin_check_array.includes(true);
  };

  const AccountErrorMessage = () => (
    <React.Fragment>
      {!accountHasAdminToken() && (
        <Text as='span' type='paragraph-1' className='error-message'>
          <Translate>
            This account doesn&apos;t have API tokens with the admin scope. Choose another account.
          </Translate>
        </Text>
      )}
    </React.Fragment>
  );

  const renderButtons = () => {
    return (
      <div className={styles.buttons}>
        <Button
          role='submit'
          disabled={disable_btn}
          style={{
            borderRadius: '0.935rem',
          }}
          size='large'
        >
          {is_update_mode ? 'Update Application' : 'Register Application'}
        </Button>
        {is_update_mode && cancelButton()}
      </div>
    );
  };
  return (
    <React.Fragment>
      <form role={'form'} className={styles.apps_form} onSubmit={handleSubmit(submit)}>
        <div
          className={`${styles.formContent} ${!admin_token && !is_update_mode && styles.noAdmin}`}
        >
          <div>
            <div className={styles.apiTokenWrapper}>
              <div className={styles.formHeaderContainer}>
                <h4>
                  <Translate>App information</Translate>
                </h4>
                {!is_update_mode && (
                  <Text as='p' type='paragraph-1' className={styles.wrapperHeading}>
                    <Translate>Select your api token ( it should have admin scope )</Translate>
                  </Text>
                )}
              </div>
              {!is_update_mode && (
                <React.Fragment>
                  <div data-testid='select-account'>
                    <CustomSelectDropdown
                      label='Your account'
                      value={currentLoginAccount && currentLoginAccount.name}
                      register={register('currency_account')}
                      is_error={!accountHasAdminToken()}
                    >
                      <SelectedAccount />
                      <AccountDropdown />
                      <AccountErrorMessage />
                    </CustomSelectDropdown>
                  </div>
                  <div
                    className={
                      !accountHasAdminToken() && !is_update_mode ? styles.disableTokenDropdown : ''
                    }
                    data-testid='select-token'
                  >
                    <CustomSelectDropdown
                      label='Choose your API token with the admin scope'
                      value={admin_token}
                      register={register('api_token')}
                      data-testid='select-token'
                    >
                      <SelectedToken />
                      <TokenDropdown admin_only />
                    </CustomSelectDropdown>
                  </div>
                </React.Fragment>
              )}
              <div>
                <div
                  className={`${styles.helperMargin} ${styles.customTextInput} ${
                    error_border_active ? styles.errorAppname : ''
                  }`}
                  id='custom-text-input'
                  onChange={(e) => {
                    setInputValue((e.target as HTMLInputElement).value);
                  }}
                >
                  <input {...register('name')} type='text' id='app_name' placeholder=' ' />
                  <label htmlFor='app_name'>
                    <Translate>App name (required)</Translate>
                  </label>
                </div>
                {errors && errors.name ? (
                  <Text as='span' type='paragraph-1' className='error-message'>
                    {errors.name.message}
                  </Text>
                ) : !is_update_mode && app_name_exists ? (
                  <Text as='span' type='paragraph-1' className='error-message'>
                    <Translate>That name is taken. Choose another.</Translate>
                  </Text>
                ) : (
                  display_restrictions && <RestrictionsAppname />
                )}
              </div>
            </div>
            <div className={styles.formHeaderContainer}>
              <h4>
                <Translate>Markup</Translate>
              </h4>
              <div className={styles.markup}>
                <Text as='span' type='paragraph-1' className={styles.formsubHeading}>
                  <Translate>
                    You can earn commission by adding a markup to the price of each trade. Enter
                    your markup percentage here.
                  </Translate>
                </Text>
                <br />
                <Text as='span' type='paragraph-1' className={styles.formsubHeading}>
                  <p>
                    <b>
                      <Translate>Note: Markup is only available for real accounts.</Translate>
                    </b>
                  </p>
                </Text>
              </div>
            </div>
            <div>
              <div>
                <div className={clsx(styles.customTextInput)} id='custom-text-input'>
                  <input
                    {...register('app_markup_percentage')}
                    type='number'
                    step='0.01'
                    id='app_markup_percentage'
                    className='last'
                    defaultValue={0}
                    placeholder=' '
                  />
                  <label htmlFor='app_markup_percentage'>
                    <Translate>Markup percentage (optional)</Translate>
                  </label>
                </div>
                <Text
                  as='p'
                  type='paragraph-2'
                  className={`${styles.helperText} ${styles.formsubHeading}`}
                >
                  <Translate>
                    Enter 0 if you don&lsquo;t want to earn a markup. Max markup: 3%
                  </Translate>
                </Text>
                {errors && errors.app_markup_percentage && (
                  <Text as='span' type='paragraph-1' className='error-message'>
                    {errors.app_markup_percentage.message}
                  </Text>
                )}
              </div>
            </div>
            <div className={styles.formHeaderContainer}>
              <h4>
                <Translate>OAuth details</Translate>
              </h4>
              <div>
                <Text as='span' type='paragraph-1' className={styles.formsubHeading}>
                  <Translate>
                    This allows clients to log in to your app using their Deriv accounts without an
                    API token.
                  </Translate>
                </Text>
              </div>
            </div>
            <div>
              <div className={styles.customTextInput} id='custom-text-input'>
                <input
                  {...register('redirect_uri')}
                  id='app_redirect_uri'
                  type='text'
                  placeholder=' '
                />
                <label htmlFor='app_redirect_uri'>
                  <Translate>Authorisation URL (optional)</Translate>
                </label>
              </div>
              <Text
                as='p'
                type='paragraph-2'
                className={`${styles.helperText} ${styles.formsubHeading}`}
              >
                <Translate>
                  Please note that this URL will be used as the OAuth redirect URL for the OAuth
                  authorization.
                </Translate>
              </Text>
              {errors && errors?.redirect_uri && (
                <span className='error-message'>{errors.redirect_uri?.message}</span>
              )}
            </div>

            <div>
              <div
                className={`${styles.verificationMargin} ${styles.customTextInput}`}
                id='custom-text-input'
              >
                <input
                  {...register('verification_uri')}
                  id='app_verification_uri'
                  type='text'
                  placeholder=' '
                />
                <label htmlFor='app_verification_uri'>
                  <Translate>Verification URL (optional)</Translate>
                </label>
              </div>
              {errors && errors.verification_uri && (
                <span className='error-message'>{errors.verification_uri.message}</span>
              )}
            </div>

            <div className={styles.scopes} id='register_scopes'>
              <div>
                <div className={styles.formHeaderContainer}>
                  <h4>
                    <Translate>Scope of authorization</Translate>
                  </h4>
                  <div className={styles.subHeading}>
                    <span>
                      <Translate>Select the scope for your app:</Translate>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.scopesWrapper}>
                <div className={styles.customCheckboxWrapper}>
                  <CustomCheckbox name='read' id='read-scope' register={register('read')}>
                    <label htmlFor='read-scope'>
                      <b>
                        <Translate>Read</Translate>
                      </b>
                      <Translate>
                        : You&apos;ll have full access to your clients&apos; information.
                      </Translate>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className={styles.customCheckboxWrapper}>
                  <CustomCheckbox name='trade' id='trade-scope' register={register('trade')}>
                    <label htmlFor='trade-scope'>
                      <b>
                        <Translate>Trade</Translate>
                      </b>
                      <Translate>
                        : You&apos;ll be able to buy and sell contracts on your clients&apos;
                        behalf.
                      </Translate>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className={styles.customCheckboxWrapper}>
                  <CustomCheckbox
                    name='trading_information'
                    id='trading_information-scope'
                    register={register('trading_information')}
                  >
                    <label htmlFor='trading_information-scope'>
                      <b>
                        <Translate>Trading information</Translate>
                      </b>
                      <Translate>
                        : You&lsquo;ll be able to view your clients&rsquo; trading information,
                        including their account balance.
                      </Translate>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className={styles.customCheckboxWrapper}>
                  <CustomCheckbox
                    name='payments'
                    id='payments-scope'
                    register={register('payments')}
                  >
                    <label htmlFor='payments-scope'>
                      <b>
                        <Translate>Payments</Translate>
                      </b>
                      <Translate>
                        : You&lsquo;ll be able to perform deposits and withdrawals on your
                        clients&rsquo; behalf.
                      </Translate>
                    </label>
                  </CustomCheckbox>
                </div>
                <div className={`${styles.customCheckboxWrapper} mb-0`}>
                  <CustomCheckbox name='admin' id='admin-scope' register={register('admin')}>
                    <label htmlFor='admin-scope'>
                      <b>
                        <Translate>Admin</Translate>
                      </b>
                      <Translate>
                        : Full account access, including the access to manage security tokens.
                      </Translate>
                    </label>
                  </CustomCheckbox>
                </div>
              </div>
            </div>
            <div className={styles.termsOfConditionRegister}>
              <span>
                <Translate>
                  By registering your application, you acknowledge that you&lsquo;ve read and
                  accepted the Deriv API
                </Translate>{' '}
              </span>
              <a
                href='https://deriv.com/tnc/business-partners-api-user.pdf'
                target='_blank'
                rel='noreferrer'
              >
                <span>
                  <Translate>terms and conditions</Translate>
                </span>
              </a>
            </div>
            {renderButtons && <div className={styles.submit_container}>{renderButtons()}</div>}
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AppForm;
