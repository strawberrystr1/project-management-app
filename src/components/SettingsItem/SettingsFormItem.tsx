import { Box, Typography, Divider, TextField, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { useUpdateUserMutation } from '../../store/services/userService';
import LoadingButton from '@mui/lab/LoadingButton';
import { IUserResponse } from '../../interfaces/apiInterfaces';
import DialogButton from '../layouts/DialogButton';
import DialogControls from '../layouts/DialogControls';
import { readToken } from '../../utils/functions';
import { useTypedDispatch } from '../../hooks/redux';
import { openSuccessSnack } from '../../store/reducers/snackSlice';
import { useEffect, useState } from 'react';
import { validate } from '../../utils/helpers/validatePassword';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IProps {
  userId: string;
  data: IUserResponse;
  omit: ('name' | 'login' | 'password')[];
  fieldName: string;
}

const SettingsFormItem: React.FC<IProps> = ({ userId, data, fieldName }) => {
  const { t, i18n } = useTranslation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useTypedDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const token = readToken();
    const body = {
      id: userId,
      token,
      body: {
        name: data.name,
        login: data.login,
        password: inputValue,
      },
    };
    const validity = validate(inputValue, i18n.language);
    if (validity) {
      setError(true);
      setErrorMessage(validity);
    } else {
      setError(false);
      setErrorMessage('');
      await updateUser(body)
        .unwrap()
        .catch((e) => e);
      dispatch(openSuccessSnack(t('snack_message.update_user')));
    }
  };

  useEffect(() => {
    if (data) {
      handleSubmit();
    }
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Box>
        <Typography fontSize={20} gutterBottom={true}>
          {t(`settings.${fieldName}`)}:
        </Typography>
        <form className={styles.settings_item}>
          <TextField
            placeholder={t(`settings.placeholder_${fieldName}`)}
            id={fieldName}
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            error={error}
            helperText={error && errorMessage}
            value={inputValue}
            autoComplete="on"
            sx={{ maxWidth: '240px', marginRight: '20px' }}
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
          <DialogButton
            type="change_password"
            message=" "
            btn={(handleOpen) => (
              <LoadingButton
                className={styles.submit}
                type="button"
                variant="contained"
                size="small"
                loading={isLoading}
                onClick={handleOpen}
              >
                {t('settings.change_btn')}
              </LoadingButton>
            )}
            form={(handleClose) => (
              <DialogControls
                onConfirm={() => {
                  handleSubmit();
                  handleClose();
                }}
                onCancel={handleClose}
              />
            )}
          />
        </form>
      </Box>
      <Divider />
    </>
  );
};

export default SettingsFormItem;
