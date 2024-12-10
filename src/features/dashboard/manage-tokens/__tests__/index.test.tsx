import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import ApiToken from '..';
import ApiTokenTable from '../../components/api-token-table';

describe('Home Page', () => {
  beforeEach(() => {
    render(<ApiToken />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render Page Heading', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/API Token Manager/i);
  });

  it('Should render api token from', () => {
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('Should render api token table', () => {
    <ApiTokenTable />;
  });
});
