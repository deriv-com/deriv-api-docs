import React from 'react';
import { Button } from '@deriv-com/quill-ui';
import { LabelPairedMinusSmFillIcon, LabelPairedPlusSmFillIcon } from '@deriv/quill-icons';
import { useFormContext } from 'react-hook-form';
import './stepper-text-field.scss';

type StepperTextFieldProps = {
  handleOnMinusClick: () => void;
  handleOnPlusClick: () => void;
  name: string;
  min: number;
  max: number;
  /**
   * Optional element to display after the input value
   */
  suffix?: React.ReactNode;
  error: {
    type: string;
  };
};

const StepperTextField: React.FC<StepperTextFieldProps> = ({
  handleOnMinusClick,
  handleOnPlusClick,
  name,
  min,
  max,
  suffix,
  error,
  ...rest
}) => {
  const { register, watch } = useFormContext();
  const value = watch(name);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    const input = document.querySelector('.stepper_text_field');
    if (input) {
      input.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (input) {
        input.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='stepper_text_field'>
      <div className='stepper_text_field__main'>
        <Button
          color='black'
          icon={<LabelPairedMinusSmFillIcon />}
          iconPosition='start'
          label=''
          onClick={handleOnMinusClick}
          size='md'
          type='button'
          variant='tertiary'
          disabled={value <= min || error?.type === 'min'}
        />
        <input
          data-testid='stepper-text-field'
          type='number'
          className='stepper_text_field'
          step='any'
          {...register(name)}
          {...rest}
        />
        {suffix && (
          <span className='stepper_text_field__suffix' data-testid='stepper-text-field-suffix'>
            {suffix}
          </span>
        )}
        <Button
          color='black'
          icon={<LabelPairedPlusSmFillIcon />}
          iconPosition='start'
          label=''
          onClick={handleOnPlusClick}
          size='md'
          type='button'
          variant='tertiary'
          disabled={value >= max || error?.type === 'max'}
        />
      </div>
    </div>
  );
};

export default StepperTextField;
