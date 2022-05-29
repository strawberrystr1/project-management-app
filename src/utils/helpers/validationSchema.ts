import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    login: yup
      .string()
      .required(t('forms.auth.login_required'))
      .test('only letters', t('forms.auth.login_letters'), (value) => {
        return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
      })
      .min(6, t('forms.auth.login_min'))
      .max(15, t('forms.auth.login_max')),
    password: yup
      .string()
      .trim()
      .test('password', t('forms.auth.password_whitespaces'), (value) => {
        return !/\s/.test(value as string);
      })
      .required(t('forms.auth.password_required'))
      .test('password', t('forms.auth.password_characters'), (value) => {
        return !/[\&@#$%\^\*]/.test(value as string);
      })
      .min(8, t('forms.auth.password_min')),
    name: yup
      .string()
      .required(t('forms.auth.name_required'))
      .test('only letters', t('forms.auth.name_letters'), (value) => {
        return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
      })
      .min(3, t('forms.auth.name_min'))
      .max(20, t('forms.auth.name_max')),
  });

  return validationSchema;
};

export default useValidationSchema;
