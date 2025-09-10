import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Text, Heading } from '@deriv-com/quill-ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { scopesObjectToArray } from '@site/src/utils';
import ApiTokenCard from '../api-token-card';
import useCreateToken from '@site/src/features/dashboard/hooks/useCreateToken';
import CreateTokenField from '../api-token-form/create-token-field';
import AccountSwitcher from '@site/src/components/AccountSwitcher';
import Translate, { translate } from '@docusaurus/Translate';
import { TApiTokenForm, tokenRegisterSchema, TScope } from './types';
import './token-register.scss';

// FIXME: Move scopes to an exportable separate file for reusability (scopes.ts)
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
    label: translate({ message: 'Trading information' }),
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

const TokenRegister = (props: HTMLAttributes<HTMLFormElement>) => {
  const { createToken } = useCreateToken();
  const [hiderestrictions, setHideRestrictions] = useState(false);
  const [formIsCleared, setFormIsCleared] = useState(false);
  const [is_toggle, setToggleModal] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TApiTokenForm>({
    resolver: yupResolver(tokenRegisterSchema),
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

  useEffect(() => {
    errors.name?.message ? setHideRestrictions(true) : setHideRestrictions(false);
  }, [errors.name?.message]);

  return (
    <>
      <div className='token_register__container'>
        <form className='formContent' onSubmit={handleSubmit(onSubmit)} {...props}>
          <div className='token_register__heading'>
            <Heading.H2>
              <Translate>Create new token</Translate>
            </Heading.H2>
          </div>
          <div className='token_register__account'>
            <Text>
              <Translate>Select your account type:</Translate>
            </Text>
            <div className='token_register__account__switcher'>
              <AccountSwitcher />
            </div>
          </div>
          <div className='token_register__scopes__text'>
            <Text>
              <Translate>Select scopes based on the access you need:</Translate>
            </Text>
          </div>
          <div className={'card_wrapper'}>
            {scopes.map((item) => (
              <ApiTokenCard
                data-testid={`api-token-card-${item.name}`}
                key={item.name}
                name={item.name}
                label={item.label}
                description={item.description}
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
