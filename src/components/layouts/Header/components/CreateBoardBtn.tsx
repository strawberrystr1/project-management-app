import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import styles from '../style.module.scss';

const CreateBoardBtn = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    console.log('creating new desk');
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Button onClick={handleClick} className={styles.btnStyle}>
        {t('header.createBoard')}
      </Button>
    </Box>
  );
};

export default CreateBoardBtn;
