import { Avatar, Button, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './style.module.scss';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import validationSchema from '../../utils/helpers/validationSchema';
import { IFromField, IInitialFormValues } from '../../interfaces/formInterfaces';

const AuthenticationForm: React.FC<IFromField> = ({ fields }) => {
  const { pathname } = useLocation();
  const [login] = useState(pathname.includes('up'));

  const initialValues = fields.reduce<IInitialFormValues>((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    validationSchema: login ? validationSchema : validationSchema.omit(['name']),
    onSubmit: (values) => console.log(values),
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
    </form>
  );
};

export default AuthenticationForm;
