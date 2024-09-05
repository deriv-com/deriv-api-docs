import { UseFormRegisterReturn } from 'react-hook-form';
import * as yup from 'yup';

export const token_name_error_map = {
  error_code_1: 'Only alphanumeric characters with spaces and underscores are allowed.',
  error_code_2: `Only 2-32 characters are allowed`,
  error_code_3: `No duplicate token names are allowed for the same account.`,
  error_code_4: `No keywords "deriv" or "binary" or words that look similar, e.g. "_binary_" or "d3riv" are allowed.`,
};

export const tokenRegisterSchema = yup.object({
  account_type: yup.string().required('Select an account type.'),
  token_name: yup
    .string()
    .required('Enter your token name.')
    .min(2, token_name_error_map.error_code_2)
    .max(32, token_name_error_map.error_code_2)
    .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]*$/, {
      message: token_name_error_map.error_code_1,
      excludeEmptyString: true,
    })
    .matches(
      /^(?!.*deriv|.*d3r1v|.*der1v|.*d3riv|.*b1nary|.*binary|.*b1n4ry|.*bin4ry|.*blnary|.*b\|nary).*$/i,
      {
        message: token_name_error_map.error_code_4,
        excludeEmptyString: true,
      },
    ),
  read: yup.boolean(),
  trade: yup.boolean(),
  payments: yup.boolean(),
  trading_information: yup.boolean(),
  admin: yup.boolean(),
});

export type ITokenRegisterForm = yup.InferType<typeof tokenRegisterSchema>;

export type TTokenRegisterProps = {
  onCancel?: () => void;
  submit: (data: ITokenRegisterForm) => void;
};

export type TCustomCheckboxProps = {
  name: string;
  id: string;
  register: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TRestrictionComponentProps = {
  error: string;
};
