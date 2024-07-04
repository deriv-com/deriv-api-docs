import React from 'react';
import { ThemeProvider } from '@deriv/ui';
import type { ReactNode } from 'react';
import { TrackJS } from 'trackjs';
import siteConfig from '@generated/docusaurus.config';
import AuthProvider from '../contexts/auth/auth.provider';
import ApiTokenProvider from '../contexts/api-token/api-token.provider';
import AppManagerContextProvider from '../contexts/app-manager/app-manager.provider';
import PlaygroundProvider from '../contexts/playground/playground.provider';
import OfficialContentsProvider from '../contexts/official-contents/official-contents.provider';

type TRootProps = {
  children: ReactNode;
};

if (siteConfig.customFields.trackJsToken) {
  TrackJS.install({
    application: 'api-deriv-com',
    token: siteConfig.customFields.trackJsToken.toString(),
  });
} else {
  console.warn('trackjs is not installed due to a missing token');
}

export default function Root({ children }: TRootProps) {
  return (
    <>
      <OfficialContentsProvider>
        <AuthProvider>
          <PlaygroundProvider>
            <ApiTokenProvider>
              <AppManagerContextProvider>
                <ThemeProvider>{children}</ThemeProvider>
              </AppManagerContextProvider>
            </ApiTokenProvider>
          </PlaygroundProvider>
        </AuthProvider>
      </OfficialContentsProvider>
    </>
  );
}
