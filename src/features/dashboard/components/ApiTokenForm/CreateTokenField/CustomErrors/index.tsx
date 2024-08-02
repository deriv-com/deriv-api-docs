import React from 'react';

type TCustomErrors = {
  token_name_exists: boolean;
  tokens_limit_reached: boolean;
  input_value: string;
};

const CustomErrors = ({ token_name_exists, tokens_limit_reached, input_value }: TCustomErrors) => {
  if (token_name_exists) {
    return (
      <div className='error-message'>
        <p>That name is taken. Choose another.</p>
      </div>
    );
  }
  if (tokens_limit_reached && input_value !== '') {
    return (
      <div className='error-message'>
        <p>You&apos;ve created the maximum number of tokens.</p>
      </div>
    );
  }

  return <></>;
};

export default CustomErrors;
