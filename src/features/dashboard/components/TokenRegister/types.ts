import { UseFormRegisterReturn } from 'react-hook-form';
import * as yup from 'yup';

const token_name_error_map = {
  error_code_1: 'Use only letters, numbers, spaces, and underscores.',
  error_code_2: `Your token's name can contain 2-32 characters.`,
  error_code_3: `Your token's name cannot contain the words "Binary", "Deriv", or any of their variations.`,
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
        message: token_name_error_map.error_code_3,
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

export type TSectionMessageComponentProps = {
  error: string;
};
