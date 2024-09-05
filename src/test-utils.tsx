import { DocusaurusContextProvider } from '@docusaurus/core/lib/client/docusaurusContext';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import Root from './theme/Root';

const DocusuarusTestProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DocusaurusContextProvider>
      <Root>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/' render={() => children} />
        </MemoryRouter>
      </Root>
    </DocusaurusContextProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: DocusuarusTestProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
