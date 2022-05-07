import * as yup from 'yup';

const validationSchema = yup.object({
  login: yup
    .string()
    .required('Login is required')
    .test('only letters', 'Login should contain only letters and numbers', (value) => {
      return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
    })
    .min(6, 'Login must be 6 or more characters')
    .max(15, 'Login must be 15 characters or less'),
  password: yup
    .string()
    .required('Password is required')
    .test(
      'password',
      `Password mustn't contain the following characters '@, #, $, %, ^, &, *'`,
      (value) => {
        return !/[\&@#$%\^\*]/.test(value as string);
      }
    )
    .min(8, 'Password must be 8 or more characters'),
  name: yup
    .string()
    .required('Name is required')
    .test('only letters', 'Name should contain only letters and numbers', (value) => {
      return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
    })
    .min(3, 'Name must be 3 or more characters')
    .max(20, 'Name must be 20 or less characters'),
});

export default validationSchema;
