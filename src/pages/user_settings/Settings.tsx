import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../../components/layouts/Header/components/LanguageSwitch';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { useGetUserMutation, useDeleteUserMutation } from '../../store/services/userService';
import styles from './style.module.scss';
import LoadingButton from '@mui/lab/LoadingButton';
import { logOut } from '../../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import SettingsItem from '../../components/SettingsItem/SettingsItem';
import SettingsFormItem from '../../components/SettingsItem/SettingsFormItem';
import { IUserResponse } from '../../interfaces/apiInterfaces';
import DialogButton from '../../components/layouts/DialogButton';
import DialogControls from '../../components/layouts/DialogControls';
import { openSuccessSnack } from '../../store/reducers/snackSlice';

const Settings = () => {
  const [getUser, { data }] = useGetUserMutation();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const { userId } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fetchUser = async () => {
    await getUser(userId)
      .unwrap()
      .catch((e) => e);
  };

  const deleteProfile = async () => {
    const body = {
      id: userId,
    };
    await deleteUser(body)
      .unwrap()
      .catch((e) => e);
    dispatch(openSuccessSnack(t('snack_message.delete_user')));
    navigate('/home');
    setTimeout(() => dispatch(logOut()), 100);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Box className={styles.settings_wrapper}>
        <Typography fontSize={24} variant="h3" sx={{ marginBottom: '40px' }}>
          {t('settings.title')}
        </Typography>
        <Box className={styles.flex_container}>
          <Box className={styles.settings_block}>
            <SettingsFormItem
              userId={userId}
              data={data as IUserResponse}
              omit={['name', 'login']}
              fieldName={'password'}
            />
            <SettingsItem render={() => <LanguageSwitch />} type="language" />
            <SettingsItem
              render={() => (
                <DialogButton
                  type="delete_profile"
                  message=" "
                  btn={(handleOpen) => (
                    <LoadingButton
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={handleOpen}
                      loading={deleteLoading}
                    >
                      {t('settings.delete_btn')}
                    </LoadingButton>
                  )}
                  form={(handleClose) => (
                    <DialogControls
                      onConfirm={() => {
                        deleteProfile();
                        handleClose();
                      }}
                      onCancel={handleClose}
                    />
                  )}
                />
              )}
              type="delete"
            />
          </Box>
          <Box>
            <Typography>{t('settings.name_block')}:</Typography>
            <Typography gutterBottom={true} variant="h3">
              {data?.name}
            </Typography>
            <Typography>{t('settings.login')}:</Typography>
            <Typography variant="h4">{data?.login}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
