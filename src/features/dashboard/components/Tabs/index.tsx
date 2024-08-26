import React from 'react';
import { Text } from '@deriv/ui';
import * as Tabs from '@radix-ui/react-tabs';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';
import AppManagement from '../../manage-apps';
import ApiToken from '../../manage-tokens';
import AppRegistration from '../../register-app';
import TokenRegistration from '../../register-tokens';
import styles from './tabs.module.scss';

type TTab = {
  id: number;
  value: TDashboardTab;
  label: string;
  content: () => JSX.Element;
};

const tabs: TTab[] = [
  {
    id: 0,
    value: TDashboardTab.MANAGE_TOKENS,
    label: 'Manage tokens',
    content: ApiToken,
  },
  {
    id: 1,
    value: TDashboardTab.REGISTER_APP,
    label: 'Register application',
    content: AppRegistration,
  },
  {
    id: 2,
    value: TDashboardTab.MANAGE_APPS,
    label: 'Manage applications',
    content: AppManagement,
  },
  {
    id: 3,
    value: TDashboardTab.REGISTER_TOKENS,
    label: 'Register Tokens',
    content: TokenRegistration,
  },
];

const DashboardTabs = () => {
  const { currentTab, updateCurrentTab } = useAppManager();

  return (
    <div className={styles.app_dashboard} id={'app-manager-dashboard'}>
      <div>
        <Text as='h2' type='heading-3' align='center'>
          Your apps
        </Text>
        <Text as='p' type='subtitle-1' align='center'>
          Register your app, get an app ID, and start using the Deriv API
        </Text>
      </div>
      <Tabs.Root
        className={styles.tabs_root}
        value={currentTab.toString()}
        onValueChange={(tab) => {
          updateCurrentTab(tab as unknown as TDashboardTab);
        }}
      >
        <Tabs.List className={styles.tabs_list}>
          {tabs.map((item: TTab) => (
            <Tabs.Trigger
              className={styles.tabs_trigger}
              key={item.id}
              value={item.value.toString()}
            >
              <Text as={'h3'} type={'paragraph-1'}>
                {item.label}
              </Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <>
          {tabs.map(({ id, value, content: Content }: TTab) => (
            <Tabs.Content key={id} value={value.toString()}>
              <div className={styles.tab_content}>
                <Content />
              </div>
            </Tabs.Content>
          ))}
        </>
      </Tabs.Root>
    </div>
  );
};

export default DashboardTabs;
