import React, { useCallback, useEffect } from 'react';
import AppUpdateForm from './AppUpdateForm';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import { IRegisterAppForm } from '../schema';
import { scopesObjectToArray } from '@site/src/utils';
import useWS from '@site/src/hooks/useWs';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';

export default function UpdateApp() {
  const { current_updating_item, updateCurrentTab } = useAppManager();
  const { send: updateApp, is_loading, error, data, clear } = useWS('app_update');

  const initialValues = {
    ...current_updating_item,
    read: (current_updating_item?.scopes as string[])?.includes('read'),
    trade: (current_updating_item?.scopes as string[])?.includes('trade'),
    admin: (current_updating_item?.scopes as string[])?.includes('admin'),
    payments: (current_updating_item?.scopes as string[])?.includes('payments'),
    trading_information: (current_updating_item?.scopes as string[])?.includes(
      'trading_information',
    ),
  };

  useEffect(() => {
    if (data?.app_id && !error) {
      updateCurrentTab(TDashboardTab.MANAGE_APPS);
    }
  }, [data, error, updateCurrentTab]);

  const onSubmit = useCallback(
    (data: IRegisterAppForm) => {
      const { name, redirect_uri, verification_uri, app_markup_percentage } = data;

      const has_redirect_uri = redirect_uri !== '' && { redirect_uri };
      const has_verification_uri = verification_uri !== '' && { verification_uri };
      const markup = {
        app_markup_percentage: Number(app_markup_percentage),
      };

      const selectedScopes = scopesObjectToArray({
        admin: data.admin,
        payments: data.payments,
        read: data.read,
        trade: data.trade,
        trading_information: data.trading_information,
      });

      const oAuthDetails = {
        scopes: has_redirect_uri ? selectedScopes : [],
        redirect_uri: has_redirect_uri ? redirect_uri : undefined,
        verification_uri: has_redirect_uri && has_verification_uri ? verification_uri : undefined,
      };

      updateApp({
        app_update: data.app_id,
        name,
        ...markup,
        ...oAuthDetails,
      });
    },
    [updateApp],
  );

  const onCancel = () => {
    updateCurrentTab(TDashboardTab.MANAGE_APPS);
  };

  return (
    <div>
      {error && <RegisterAppDialogError error={error} onClose={clear} />}
      <AppUpdateForm
        initialValues={initialValues}
        submit={onSubmit}
        onCancel={onCancel}
        is_loading={is_loading}
      />
    </div>
  );
}
