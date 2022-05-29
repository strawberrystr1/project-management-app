import { Avatar, IconButton, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './style.module.scss';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IFromField, IInitialFormValues } from '../../interfaces/formInterfaces';
import { useCreateUserMutation, useSignInMutation } from '../../store/services/userService';
import { useTypedDispatch } from '../../hooks/redux';
import { setToken } from '../../store/reducers/userSlice';
import { useTranslation } from 'react-i18next';
import jwt from 'jwt-decode';
import { openSuccessSnack } from '../../store/reducers/snackSlice';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import useValidationSchema from '../../utils/helpers/validationSchema';
import useFormikTranslation from '../../hooks/useFormikTranslate';

const AuthenticationForm: React.FC<IFromField> = ({ fields }) => {
  const { pathname } = useLocation();
  const [login] = useState(pathname.includes('up'));
  const [createUser, { isLoading: createUserLoading }] = useCreateUserMutation();
  const [signInUser, { isLoading }] = useSignInMutation({
    fixedCacheKey: 'user-data',
  });
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

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
      dispatch(openSuccessSnack(t('forms.auth.success')));
      setTimeout(() => navigate('/boards'), 1000);
    } catch (e) {}
  };

  const validationSchema = useValidationSchema();

  const formik = useFormik({
    initialValues,
    validationSchema: login ? validationSchema : validationSchema.omit(['name']),
    onSubmit: handleSubmit,
  });
  useFormikTranslation(formik.validateForm);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form className={styles.boxWrapper} onSubmit={formik.handleSubmit}>
      <Avatar alt="auth-logo" color="primary" className={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography fontSize={26} variant="h5" className={styles['mr-bot']}>
        {login ? t('forms.auth.title_sup') : t('forms.auth.title_sin')}
      </Typography>
      {fields.map((item) => {
        if (item === 'password') {
          return (
            <TextField
              className={styles.input}
              classes={{
                root: styles.label,
              }}
              id={item}
              key={item}
              name={item}
              label={t(`forms.auth.${item}`)}
              autoComplete="on"
              type={showPassword ? 'text' : 'password'}
              value={formik.values[item]}
              onChange={formik.handleChange}
              error={formik.touched[item] && Boolean(formik.errors[item])}
              helperText={formik.touched[item] && formik.errors[item]}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ position: 'absolute', right: '12px', top: '8px' }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          );
        } else {
          return (
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
          );
        }
      })}
      <Box className={`${styles.boxWrapper} ${styles.buttonsWrapper}`}>
        <LoadingButton
          type="submit"
          className={`${styles.button} ${styles.override}`}
          variant="contained"
          loading={isLoading || createUserLoading}
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
    </form>
  );
};

export default AuthenticationForm;
