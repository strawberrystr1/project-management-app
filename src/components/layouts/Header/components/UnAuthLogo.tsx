import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

const btnStyle = {
  color: 'white',
  '&:hover': { color: '#c2c2c2' },
};

const UnAuthLogo = () => {
  const { t } = useTranslation();

  const signIn = () => {
    console.log('Sign in');
  };

  const signUn = () => {
    console.log('Sign up');
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Button onClick={signIn} sx={btnStyle}>
        {t('header.signInProfile')}
      </Button>
      <Button onClick={signUn} sx={btnStyle}>
        {t('header.signUpProfile')}
      </Button>
    </Box>
  );
};

export default UnAuthLogo;
