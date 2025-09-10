import { translate } from '@docusaurus/Translate';
import * as yup from 'yup';

export const tokenRegisterSchema = yup
  .object({
    read: yup.boolean(),
    trade: yup.boolean(),
    payments: yup.boolean(),
    trading_information: yup.boolean(),
    admin: yup.boolean(),
    name: yup
      .string()
      .min(2, translate({ message: 'Your token name must be atleast 2 characters long.' }))
      .max(32, translate({ message: 'Only up to 32 characters are allowed.' }))
      .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]*$/, {
        message: translate({
          message:
            'Only alphanumeric characters with spaces and underscores are allowed. (Example: my_application)',
        }),
        excludeEmptyString: true,
      })
      .matches(
        /^(?!.*deriv|.*d3r1v|.*der1v|.*d3riv|.*b1nary|.*binary|.*b1n4ry|.*bin4ry|.*blnary|.*b\|nary).*$/i,
        {
          message: translate({
            message: 'The name cannot contain “Binary”, “Deriv”, or similar words.',
          }),
          excludeEmptyString: true,
        },
      ),
  })
  .required();

export type TApiTokenForm = yup.InferType<typeof tokenRegisterSchema>;

export type TApiTokenFormItemsNames = keyof TApiTokenForm;

export type TScope = {
  name: TApiTokenFormItemsNames;
  description: string;
  label: string;
};
