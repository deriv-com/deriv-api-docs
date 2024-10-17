import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomRadioButton from '..';

const onChange = jest.fn();

describe('CustomRadioButton', () => {
  const renderRadioButton = ({ checked }) => {
    render(
      <CustomRadioButton
        id='test_id'
        name='test_name'
        value='test_value'
        checked={checked}
        onChange={onChange}
      >
        <label htmlFor='test_id'>this is a test label</label>
      </CustomRadioButton>,
    );
  };

  afterEach(() => {
    cleanup();
  });

  it('should render the radio button', () => {
    renderRadioButton({ checked: true });
    const label = screen.getByText('this is a test label');
    expect(label).toBeInTheDocument();
  });

  it('should render the radio button with checked icon', () => {
    renderRadioButton({ checked: true });
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/img/circle_dot_caption_fill.svg');
  });

  it('should render the radio button with unchecked icon', () => {
    renderRadioButton({ checked: false });
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/img/circle_dot_caption_bold.svg');
  });

  it('should fire the onChange event when clicking the button', async () => {
    renderRadioButton({ checked: false });
    const radio_button = screen.getByRole<HTMLInputElement>('radio', {
      name: 'this is a test label',
    });
    await userEvent.click(radio_button);
    expect(onChange).toBeCalled();
  });
});
