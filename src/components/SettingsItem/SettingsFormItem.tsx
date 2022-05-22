import { Box, Typography, Divider, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { useFormik } from 'formik';
import validationSchema from '../../utils/helpers/validationSchema';
import { useUpdateUserMutation } from '../../store/services/userService';
import LoadingButton from '@mui/lab/LoadingButton';
import { IUserResponse } from '../../interfaces/apiInterfaces';
import DialogButton from '../layouts/DialogButton';
import DialogControls from '../layouts/DialogControls';
import { readToken } from '../../utils/functions';
import { useTypedDispatch } from '../../hooks/redux';
import { openSuccessSnack } from '../../store/reducers/snackSlice';
import { useState } from 'react';
import { validate } from '../../utils/helpers/validatePassword';

interface IProps {
  userId: string;
  data: IUserResponse;
  omit: ('name' | 'login' | 'password')[];
  fieldName: string;
}

const SettingsFormItem: React.FC<IProps> = ({ userId, data, omit, fieldName }) => {
  const { t } = useTranslation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useTypedDispatch();
  const [inputValue, setInputValue] = useState('');

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
    const validity = validate(inputValue);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
            name={fieldName}
            onChange={handleChange}
            error={error}
            helperText={error && errorMessage}
            value={inputValue}
            sx={{ maxWidth: '240px' }}
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
