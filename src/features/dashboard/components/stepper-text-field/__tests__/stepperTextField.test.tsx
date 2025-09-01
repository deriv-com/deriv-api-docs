import React from 'react';
import { render, screen } from '@testing-library/react';
import { useFormContext } from 'react-hook-form';
import StepperTextField from '..';

// Mock useFormContext
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: jest.fn(),
}));

describe('StepperTextField', () => {
  const mockRegister = jest.fn();
  const mockWatch = jest.fn().mockReturnValue(5);

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      watch: mockWatch,
    });
  });

  const renderStepperTextField = (props?: Partial<React.ComponentProps<typeof StepperTextField>>) => {
    render(
      <StepperTextField
        handleOnMinusClick={() => jest.fn()}
        handleOnPlusClick={() => jest.fn()}
        name='test'
        min={0}
        max={10}
        error={{
          type: 'min',
        }}
        {...props}
      />,
    );
  };

  it('should render StepperTextField', () => {
    renderStepperTextField();
    const input = screen.getByTestId('stepper-text-field');
    expect(input).toBeInTheDocument();
  });

  it('should render suffix when provided', () => {
    renderStepperTextField({ suffix: '%' });
    expect(screen.getByTestId('stepper-text-field-suffix')).toHaveTextContent('%');
  });
});
