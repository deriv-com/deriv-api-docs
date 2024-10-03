import React from 'react';
import { ThemeProvider } from '@deriv-com/quill-ui';
import type { ReactNode } from 'react';
import { TrackJS } from 'trackjs';
import { Analytics } from '@deriv-com/analytics';
import siteConfig from '@generated/docusaurus.config';
import AuthProvider from '../contexts/auth/auth.provider';
import ApiTokenProvider from '../contexts/api-token/api-token.provider';
import AppManagerContextProvider from '../contexts/app-manager/app-manager.provider';
import PlaygroundProvider from '../contexts/playground/playground.provider';
import OfficialContentsProvider from '../contexts/official-contents/official-contents.provider';

type TRootProps = {
  children: ReactNode;
};

const { trackJsToken, rudderstackKey, growthbookClientKey, growthbookDecryptionKey } =
  siteConfig.customFields;

if (trackJsToken) {
  TrackJS.install({
    application: 'api-deriv-com',
    token: siteConfig.customFields.trackJsToken.toString(),
  });
} else {
  console.warn('trackjs is not installed due to a missing token');
}

if (rudderstackKey && growthbookClientKey && growthbookDecryptionKey) {
  Analytics?.initialise({
    growthbookKey: siteConfig.customFields.growthbookClientKey.toString(),
    growthbookDecryptionKey: siteConfig.customFields.growthbookDecryptionKey.toString(),
    rudderstackKey: siteConfig.customFields.rudderstackKey.toString(),
  });
} else {
  console.warn('rudderstack and growthbook are not initialised due to missing keys');
}

export default function Root({ children }: TRootProps) {
  return (
    <>
      <OfficialContentsProvider>
        <AuthProvider>
          <PlaygroundProvider>
            <ApiTokenProvider>
              <AppManagerContextProvider>
                <ThemeProvider theme='light' persistent>
                  {children}
                </ThemeProvider>
              </AppManagerContextProvider>
            </ApiTokenProvider>
          </PlaygroundProvider>
        </AuthProvider>
      </OfficialContentsProvider>
    </>
  );
}
