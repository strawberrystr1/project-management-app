import { Avatar, Button, Snackbar, TextField, Typography, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './style.module.scss';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import validationSchema from '../../utils/helpers/validationSchema';
import { IFromField, IInitialFormValues } from '../../interfaces/formInterfaces';
import { useCreateUserMutation, useSignInMutation } from '../../store/reducers/userInfoSlice';
import { IAPIError } from '../../interfaces/apiInterfaces';

const AuthenticationForm: React.FC<IFromField> = ({ fields }) => {
  const { pathname } = useLocation();
  const [login] = useState(pathname.includes('up'));
  const [createUser] = useCreateUserMutation({ fixedCacheKey: 'user-data' });
  const [signInUser, { isSuccess }] = useSignInMutation({ fixedCacheKey: 'user-data' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = fields.reduce<IInitialFormValues>((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  useEffect(() => {
    console.log(isSuccess);
  }, [isSuccess]);

  const handleSubmit = async (values: IInitialFormValues) => {
    try {
      if (pathname.includes('up')) {
        await createUser(values).unwrap();
      }
      const signInData = {
        login: values.login,
        password: values.password,
      };
      await signInUser(signInData).unwrap();
      setErrorMessage('');
      setTimeout(() => navigate('/boards'), 1000);
    } catch (e) {
      console.log(e);
      const { message } = (e as IAPIError).data;
      setErrorMessage(message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: login ? validationSchema : validationSchema.omit(['name']),
    onSubmit: handleSubmit,
  });

  return (
    <form className={styles.boxWrapper} onSubmit={formik.handleSubmit}>
      <Avatar alt="auth-logo" color="primary" className={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography fontSize={26} variant="h5" className={styles['mr-bot']}>
        {login ? 'Sign Up' : 'Sign in'}
      </Typography>
      {fields.map((item) => (
        <TextField
          className={styles.input}
          classes={{
            root: styles.label,
          }}
          id={item}
          name={item}
          label={item}
          value={formik.values[item]}
          onChange={formik.handleChange}
          error={formik.errors[item] ? true : false}
          helperText={formik.errors[item] ? formik.errors[item] : ''}
          key={item}
        />
      ))}
      <Box className={`${styles.boxWrapper} ${styles.buttonsWrapper}`}>
        <Button type="submit" className={`${styles.button} ${styles.override}`} variant="contained">
          {login ? 'Sign Up' : 'Sign in'}
        </Button>
        <Link
          to={login ? '/sign-in' : '/sign-up'}
          className={`${styles.buttonView} ${styles.override}`}
        >
          {login ? 'Already have an account? Sign in' : 'Back to registration'}
        </Link>
      </Box>
      <Snackbar open={isSuccess} autoHideDuration={1000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          You successfully loged in!
        </Alert>
      </Snackbar>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default AuthenticationForm;
