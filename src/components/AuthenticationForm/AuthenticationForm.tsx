import { Avatar, Snackbar, TextField, Typography, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './style.module.scss';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import validationSchema from '../../utils/helpers/validationSchema';
import { IFromField, IInitialFormValues } from '../../interfaces/formInterfaces';
import { useCreateUserMutation, useSignInMutation } from '../../store/services/userService';
import { IAPIError } from '../../interfaces/apiInterfaces';
import { useTypedDispatch } from '../../hooks/redux';
import { setToken } from '../../store/reducers/userSlice';
import { useTranslation } from 'react-i18next';
import jwt from 'jwt-decode';

const AuthenticationForm: React.FC<IFromField> = ({ fields }) => {
  const { pathname } = useLocation();
  const [login] = useState(pathname.includes('up'));
  const [createUser] = useCreateUserMutation();
  const [signInUser, { isLoading }] = useSignInMutation({
    fixedCacheKey: 'user-data',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const initialValues = fields.reduce<IInitialFormValues>((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  const handleSubmit = async (values: IInitialFormValues) => {
    const signInData = {
      login: values.login,
      password: values.password,
    };

    try {
      if (pathname.includes('up')) {
        await createUser(values).unwrap();
      }
      await signInUser(signInData)
        .unwrap()
        .then((res: { token: string }) => {
          const { id } = jwt<{ id: string }>(res.token);
          dispatch(setToken({ isLogged: true, id }));
          localStorage.setItem('token-rss', res.token);
        });
      setIsSnackBarOpen(true);
      setTimeout(() => navigate('/boards'), 1000);
    } catch (e) {
      const { message } = (e as IAPIError).data;
      setErrorMessage(message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: login ? validationSchema : validationSchema.omit(['name']),
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    setTimeout(() => {
      setIsSnackBarOpen(false);
      setErrorMessage('');
    }, 500);
  };

  return (
    <form className={styles.boxWrapper} onSubmit={formik.handleSubmit}>
      <Avatar alt="auth-logo" color="primary" className={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography fontSize={26} variant="h5" className={styles['mr-bot']}>
        {login ? t('forms.auth.title_sup') : t('forms.auth.title_sin')}
      </Typography>
      {fields.map((item) => (
        <TextField
          className={styles.input}
          classes={{
            root: styles.label,
          }}
          id={item}
          name={item}
          label={t(`forms.auth.${item}`)}
          value={formik.values[item]}
          onChange={formik.handleChange}
          error={formik.touched[item] && Boolean(formik.errors[item])}
          helperText={formik.touched[item] && formik.errors[item]}
          key={item}
        />
      ))}
      <Box className={`${styles.boxWrapper} ${styles.buttonsWrapper}`}>
        <LoadingButton
          type="submit"
          className={`${styles.button} ${styles.override}`}
          variant="contained"
          loading={isLoading}
        >
          {login ? t('forms.auth.title_sup') : t('forms.auth.title_sin')}
        </LoadingButton>
        <Link
          to={login ? '/sign-in' : '/sign-up'}
          className={`${styles.buttonView} ${styles.override}`}
        >
          {login ? t('forms.auth.change_btn_sup') : t('forms.auth.change_btn_sin')}
        </Link>
      </Box>
      <Snackbar open={isSnackBarOpen} autoHideDuration={1000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {t('forms.auth.success')}
        </Alert>
      </Snackbar>
      <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AuthenticationForm;
