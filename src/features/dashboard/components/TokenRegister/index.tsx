import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Text, Heading } from '@deriv-com/quill-ui';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { scopesObjectToArray } from '@site/src/utils';
import ApiTokenCard from '../ApiTokenCard';
import useCreateToken from '@site/src/features/dashboard/hooks/useCreateToken';
import * as yup from 'yup';
import './token-register.scss';
import CreateTokenField from '../ApiTokenForm/CreateTokenField';
import AccountSwitcher from '@site/src/components/AccountSwitcher';

const schema = yup
  .object({
    read: yup.boolean(),
    trade: yup.boolean(),
    payments: yup.boolean(),
    trading_information: yup.boolean(),
    admin: yup.boolean(),
    name: yup
      .string()
      .min(2, 'Your token name must be atleast 2 characters long.')
      .max(32, 'Only up to 32 characters are allowed.')
      .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]*$/, {
        message:
          'Only alphanumeric characters with spaces and underscores are allowed. (Example: my_application)',
        excludeEmptyString: true,
      })
      .matches(
        /^(?!.*deriv|.*d3r1v|.*der1v|.*d3riv|.*b1nary|.*binary|.*b1n4ry|.*bin4ry|.*blnary|.*b\|nary).*$/i,
        {
          message: 'The name cannot contain “Binary”, “Deriv”, or similar words.',
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
    description:
      'This scope will allow third-party apps to view your account activity, settings, limits, balance sheets, trade purchase history, and more.',
    label: 'Read',
  },
  {
    name: 'trade',
    description:
      'This scope will allow third-party apps to buy and sell contracts for you, renew your expired purchases, and top up your demo accounts.',
    label: 'Trade',
  },
  {
    name: 'payments',
    description:
      'This scope will allow third-party apps to withdraw to payment agents and make inter-account transfers for you.',
    label: 'Payments',
  },
  {
    name: 'trading_information',
    description: 'This scope will allow third-party apps to view your trading history.',
    label: 'Trading information',
  },
  {
    name: 'admin',
    description:
      'This scope will allow third-party apps to open accounts for you, manage your settings and token usage, and more.',
    label: 'Admin',
  },
];

const TokenRegister = (props: HTMLAttributes<HTMLFormElement>) => {
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
    <>
      <div className='token_register__container'>
        <form className='formContent' onSubmit={handleSubmit(onSubmit)} {...props}>
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
          <div className={'card_wrapper'}>
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
        </form>
      </div>
    </>
  );
};

export default TokenRegister;
