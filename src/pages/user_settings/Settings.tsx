import { Box, Button, Divider, Input, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../../components/layouts/Header/components/LanguageSwitch';
import { useTypedSelector } from '../../hooks/redux';
import { useGetUserMutation } from '../../store/services/userService';
import styles from './style.module.scss';

const Settings = () => {
  const [getUser, { data }] = useGetUserMutation();
  const { userId } = useTypedSelector((state) => state.user);
  const { t } = useTranslation();

  const fetchUser = async () => {
    const token = localStorage.getItem('token-rss') as string;
    await getUser({ id: userId, token }).unwrap();
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
            <Box>
              <Typography fontSize={20} gutterBottom={true}>
                {t('settings.password')}:
              </Typography>
              <Box className={styles.settings_item}>
                <Input placeholder={t('settings.placeholder')} />
                <Button variant="contained" size="small">
                  {t('settings.change_btn')}
                </Button>
              </Box>
            </Box>
            <Divider />
            <Box>
              <Box className={styles.settings_item}>
                <Typography fontSize={20} gutterBottom={true}>
                  {t('settings.language')}:
                </Typography>
                <LanguageSwitch />
              </Box>
            </Box>
            <Divider />
            <Box>
              <Box className={styles.settings_item}>
                <Typography fontSize={20} gutterBottom={true}>
                  {t('settings.delete')}:
                </Typography>
                <Button variant="contained" color="error" size="small">
                  {t('settings.delete_btn')}
                </Button>
              </Box>
            </Box>
            <Divider />
          </Box>
          <Box>
            <Typography>{t('settings.name')}:</Typography>
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
