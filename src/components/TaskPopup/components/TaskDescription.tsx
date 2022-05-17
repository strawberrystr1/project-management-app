import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogControls from '../../layouts/DialogControls';
import styles from '../style.module.scss';

const TaskDescription: React.FC<{ description: string }> = ({ description }) => {
  const [input, setInput] = useState(false);
  const { t } = useTranslation();
  const handleClick = () => setInput((prev) => !prev);

  const handleChange = () => {
    console.log('change description with BE');
    setInput(false);
  };

  return (
    <DialogContent sx={{ padding: '15px 0' }}>
      <DialogTitle sx={{ padding: '0' }}>{t('task_popup.desc')}</DialogTitle>
      <Box className={styles.description}>
        {!input && <DialogContentText>{description}</DialogContentText>}
        {input && (
          <TextField
            variant="filled"
            multiline
            defaultValue={description}
            rows={4}
            sx={{ width: '60%' }}
          />
        )}
        {!input && (
          <Button size="small" variant="contained" onClick={handleClick}>
            {t('settings.change_btn')}
          </Button>
        )}
        {input && <DialogControls onConfirm={handleChange} onCancel={handleClick} />}
      </Box>
    </DialogContent>
  );
};

export default TaskDescription;
