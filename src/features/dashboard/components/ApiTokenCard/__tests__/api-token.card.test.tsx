import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import ApiTokenCard from '..';
import userEvent from '@testing-library/user-event';
const mockRegister = jest.fn();

describe('Home Page', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render Page Heading', () => {
    render(
      <ApiTokenCard
        register={mockRegister}
        name={'admin'}
        description={'admin description'}
        label={'Admin Label'}
      />,
    );

    const label = screen.getByTestId('card-label-admin');
    expect(label).toBeInTheDocument();
    expect(label.textContent).toMatch(/Admin Label/i);
  });

  it('Should checkbox input', () => {
    render(
      <ApiTokenCard
        register={mockRegister}
        name={'admin'}
        description={'admin description'}
        label={'Admin Label'}
      />,
    );

    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeInTheDocument();
  });

  it('Should render description', () => {
    render(
      <ApiTokenCard
        register={mockRegister}
        name={'admin'}
        description={'admin description'}
        label={'Admin Label'}
      />,
    );

    const description = screen.getByTestId('card-label-admin');
    expect(description).toBeInTheDocument();
  });

  it('Should change value of checkbox on click', async () => {
    render(
      <ApiTokenCard
        register={mockRegister}
        name={'admin'}
        description={'admin description'}
        label={'Admin Label'}
      />,
    );

    const checkboxInput = screen.getByRole<HTMLInputElement>('checkbox');

    expect(checkboxInput.checked).toBeFalsy();

    await userEvent.click(checkboxInput);

    expect(checkboxInput.checked).toBeTruthy();
  });
});
