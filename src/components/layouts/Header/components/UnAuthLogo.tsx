import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from '../style.module.scss';

const UnAuthLogo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const signIn = () => {
    navigate(`/sign-ip`);
  };

  const signUn = () => {
    navigate(`/sign-up`);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Button onClick={signIn} className={styles.btnStyle}>
        {t('header.signInProfile')}
      </Button>
      <Button onClick={signUn} className={styles.btnStyle}>
        {t('header.signUpProfile')}
      </Button>
    </Box>
  );
};

export default UnAuthLogo;
