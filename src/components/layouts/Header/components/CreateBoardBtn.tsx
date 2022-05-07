import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';

const btnStyle = {
  color: 'white',
  '&:hover': { color: '#c2c2c2' },
};

const CreateBoardBtn = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    console.log('creating new desk');
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Button onClick={handleClick} sx={btnStyle}>
        {t('header.createBoard')}
      </Button>
    </Box>
  );
};

export default CreateBoardBtn;
