import { Avatar, Button, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './style.module.scss';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import validationSchema from '../../utils/helpers/validationSchema';

const AuthenticationForm = () => {
  const [login, setLogin] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('sign-in')) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [pathname]);

  const initialValues = !login
    ? {
        login: '',
        password: '',
        name: '',
      }
    : {
        login: '',
        password: '',
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <form className={styles.boxWrapper} onSubmit={formik.handleSubmit}>
      <Avatar alt="auth-logo" color="primary" className={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography fontSize={26} variant="h5">
        Sign Up
      </Typography>
      {!login && (
        <TextField
          className={styles.input}
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name ? true : false}
          helperText={formik.errors.name ? formik.errors.name : ''}
        />
      )}
      <TextField
        className={styles.input}
        id="login"
        name="login"
        label="Login"
        value={formik.values.login}
        onChange={formik.handleChange}
        error={formik.errors.login ? true : false}
        helperText={formik.errors.login ? formik.errors.login : ''}
      />
      <TextField
        className={styles.input}
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password ? true : false}
        helperText={formik.errors.password ? formik.errors.password : ''}
      />
      <Box className={`${styles.boxWrapper} ${styles.buttonsWrapper}`}>
        <Button type="submit" className={`${styles.button} ${styles.override}`} variant="contained">
          {!login ? 'Sign Up' : 'Sign in'}
        </Button>
        <Link
          to={!login ? '/sign-in' : '/sign-up'}
          className={`${styles.buttonView} ${styles.override}`}
        >
          {!login ? 'Already have an account? Sign in' : 'Back to registration'}
        </Link>
      </Box>
    </form>
  );
};

export default AuthenticationForm;
