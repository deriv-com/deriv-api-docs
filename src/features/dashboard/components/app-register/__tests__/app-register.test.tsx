import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import AppRegister from '..';

const mock_submit = jest.fn();

describe('AppRegister', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render the register form with register button', () => {
    render(<AppRegister submit={mock_submit} />);

    const button = screen.getByText(/Register now/i);
    expect(button).toBeInTheDocument();
  });
});
