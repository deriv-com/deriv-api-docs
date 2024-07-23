import React, { act } from 'react';
import ValidDialog from '..';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ValidDialog', () => {
  test('if correct test is rendered', () => {
    location.assign = jest.fn();

    render(<ValidDialog setIsNotValid={jest.fn()} setToggleModal={jest.fn()} />);
    const text = screen.getByText(
      'Your JSON object is invalid. Please make sure you provide the correct syntax for your JSON object.',
    );

    expect(text).toBeVisible();
  });
  it('should close popup when clicking on close button', async () => {
    const setIsNotValid = jest.fn();
    const setToggleModal = jest.fn();

    render(<ValidDialog setIsNotValid={setIsNotValid} setToggleModal={setToggleModal} />);
    const modal = screen.getByText(
      'Your JSON object is invalid. Please make sure you provide the correct syntax for your JSON object.',
    );
    const close_button = screen.getByTestId('close-button');

    await act(async () => {
      await userEvent.click(close_button);
    });

    expect(modal).not.toBeInTheDocument();
    expect(setIsNotValid).toHaveBeenCalled();
    expect(setToggleModal).toHaveBeenCalled();
  });
});
