import React from 'react';
import { Heading, Text } from '@deriv/quill-design';
import './app-dashboard-container.scss';

const AppDashboardContainer: React.FC = ({ children }) => {
  return (
    <div className='app_dashboard_container'>
      <div className='app_dashboard_container_main'>
        <div className='app_dashboard_container_top'>
          <Heading.H2>App dashboard</Heading.H2>
          <Text size='md'>
            Start using Deriv API to bring custom integrations and powerful automation to your apps.
          </Text>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppDashboardContainer;
