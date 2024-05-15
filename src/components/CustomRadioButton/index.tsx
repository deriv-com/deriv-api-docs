import React from 'react';
import './custom_radio_button.scss';

type CustomRadioButtonProps = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
};

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  children,
  ...rest
}) => {
  return (
    <div className='custom_radio'>
      <input type='radio' id={id} name={name} value={value} onClick={onChange} {...rest} />
      <label htmlFor={id}>
        <div className='custom_radio__icon'>
          {checked ? (
            <img src='/img/circle_dot_caption_fill.svg' />
          ) : (
            <img src='/img/circle_dot_caption_bold.svg' />
          )}
        </div>
        <div>{children}</div>
      </label>
    </div>
  );
};

export default CustomRadioButton;
