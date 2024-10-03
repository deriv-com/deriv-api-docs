import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import Translate, { translate } from '@docusaurus/Translate';
import { useForm } from 'react-hook-form';
import { Text } from '@deriv/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { scopesObjectToArray } from '@site/src/utils';
import useCreateToken from '@site/src/features/dashboard/hooks/useCreateToken';
import ApiTokenCard from '../api-token-card';
import TokenNameRestrictions from '../token-name-restrictions';
import CreateTokenField from './create-token-field';
import Spinner from 'src/components/Spinner';
import styles from './api-token-form.module.scss';

const schema = yup
  .object({
    read: yup.boolean(),
    trade: yup.boolean(),
    payments: yup.boolean(),
    trading_information: yup.boolean(),
    admin: yup.boolean(),
    name: yup
      .string()
      .min(2, translate({ message: 'Your token name must be atleast 2 characters long.' }))
      .max(32, translate({ message: 'Only up to 32 characters are allowed.' }))
      .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]*$/, {
        message: translate({
          message:
            'Only alphanumeric characters with spaces and underscores are allowed. (Example: my_application)',
        }),
        excludeEmptyString: true,
      })
      .matches(
        /^(?!.*deriv|.*d3r1v|.*der1v|.*d3riv|.*b1nary|.*binary|.*b1n4ry|.*bin4ry|.*blnary|.*b\|nary).*$/i,
        {
          message: translate({
            message: 'The name cannot contain “Binary”, “Deriv”, or similar words.',
          }),
          excludeEmptyString: true,
        },
      ),
  })
  .required();

export type TApiTokenForm = yup.InferType<typeof schema>;
export type TApiTokenFormItemsNames = keyof TApiTokenForm;

type TScope = {
  name: TApiTokenFormItemsNames;
  description: string;
  label: string;
};

const scopes: TScope[] = [
  {
    name: 'read',
    description: translate({
      message:
        'This scope will allow third-party apps to view your account activity, settings, limits, balance sheets, trade purchase history, and more.',
    }),
    label: translate({ message: 'Read' }),
  },
  {
    name: 'trade',
    description: translate({
      message:
        'This scope will allow third-party apps to buy and sell contracts for you, renew your expired purchases, and top up your demo accounts.',
    }),
    label: translate({ message: 'Trade' }),
  },
  {
    name: 'payments',
    description: translate({
      message:
        'This scope will allow third-party apps to withdraw to payment agents and make inter-account transfers for you.',
    }),
    label: translate({ message: 'Payments' }),
  },
  {
    name: 'trading_information',
    description: translate({
      message: 'This scope will allow third-party apps to view your trading history.',
    }),
    label: translate({ message: 'Trading Information' }),
  },
  {
    name: 'admin',
    description: translate({
      message:
        'This scope will allow third-party apps to open accounts for you, manage your settings and token usage, and more.',
    }),
    label: translate({ message: 'Admin' }),
  },
];

const ApiTokenForm = (props: HTMLAttributes<HTMLFormElement>) => {
  const { createToken, isCreatingToken } = useCreateToken();
  const [hiderestrictions, setHideRestrictions] = useState(false);
  const [formIsCleared, setFormIsCleared] = useState(false);
  const [is_toggle, setToggleModal] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TApiTokenForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSubmit = useCallback(
    (data: TApiTokenForm) => {
      const { name } = data;
      const selectedTokenScope = scopesObjectToArray({
        admin: data.admin,
        payments: data.payments,
        read: data.read,
        trade: data.trade,
        trading_information: data.trading_information,
      });
      createToken(name, selectedTokenScope);
      setFormIsCleared(true);
      setToggleModal((prev) => !prev);
      reset();
    },
    [createToken, reset],
  );

  const onCardClick = useCallback(
    (name: TApiTokenFormItemsNames) => {
      const values = getValues();
      setValue(name, !values[name]);
    },
    [getValues, setValue],
  );

  useEffect(() => {
    errors.name?.message ? setHideRestrictions(true) : setHideRestrictions(false);
  }, [errors.name?.message]);

  return (
    <form role={'form'} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={styles.steps_line} />
      <div>
        {isCreatingToken && <Spinner />}
        <div className={styles.step_title}>
          <div className={`${styles.first_step} ${styles.step}`}>
            <Text as='p' type='paragraph-1' data-testid='first-step-title'>
              <Translate>Select scopes based on the access you need.</Translate>
            </Text>
          </div>
        </div>
        <div className={styles.card_wrapper}>
          {scopes.map((item) => (
            <ApiTokenCard
              data-testid={`api-token-card-${item.name}`}
              key={item.name}
              name={item.name}
              label={item.label}
              description={item.description}
              onClick={() => {
                onCardClick(item.name);
              }}
              register={register}
            />
          ))}
        </div>
        <CreateTokenField
          register={register('name')}
          errors={errors}
          formIsCleared={formIsCleared}
          setFormIsCleared={setFormIsCleared}
          setHideRestriction={setHideRestrictions}
          is_toggle={is_toggle}
          setToggleModal={setToggleModal}
        />
        {!hiderestrictions && <TokenNameRestrictions />}
        <div className={styles.step_title}>
          <div className={`${styles.third_step} ${styles.step}`}>
            <Text as='p' type='paragraph-1' data-testid='third-step-title'>
              <Translate>Copy and paste the token into the app.</Translate>
            </Text>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApiTokenForm;
