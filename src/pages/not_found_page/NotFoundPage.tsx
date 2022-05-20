import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import picture from '../../assets/images/not-found.png';

const SECONDS = 5;

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(SECONDS);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prev) => prev - 1);
      if (seconds === 0) navigate('/home');
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [navigate, seconds]);

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} mt={2} mb={2} gap={2}>
      <Box>
        <Typography
          variant="h2"
          sx={{
            color: (theme) => theme.palette.error.main,
            textAlign: 'center',
            padding: '1rem 0 2rem',
          }}
        >
          {t('not_found.title')}
        </Typography>
        <Typography variant="h3" sx={{ color: (theme) => theme.palette.warning.main }} gutterBottom>
          {t('not_found.subtitle')}
        </Typography>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.info.main }}>
          {t('not_found.paragraph')}
          <Typography
            variant="inherit"
            sx={{
              color: (theme) => theme.palette.error.main,
              display: 'inline',
              fontSize: '1.1em',
            }}
          >
            {'..' + seconds}
          </Typography>
        </Typography>
      </Box>
      <img
        src={picture}
        alt="404 error"
        style={{ height: '440px', width: 'fit-content', alignSelf: 'center' }}
      />
    </Stack>
  );
};

export default NotFound;
