import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUpdateTaskFromPopup } from '../../../interfaces/apiInterfaces';
import DialogControls from '../../layouts/DialogControls';
import styles from '../style.module.scss';

type Props = {
  description: string;
  handleChange: (newData: IUpdateTaskFromPopup) => void;
  color: string;
};

const TaskDescription = ({ description, handleChange, color }: Props) => {
  const [input, setInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();
  const handleClick = () => setInput((prev) => !prev);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleSubmit = () => {
    if (inputValue.trim().length > 0) {
      if (color) {
        handleChange({ description: `${inputValue} <!> ${color}` });
      } else {
        handleChange({ description: inputValue });
      }
    }
    setInput(false);
  };

  return (
    <DialogContent sx={{ padding: '15px 0', overflowY: 'visible' }}>
      <DialogTitle sx={{ padding: '0' }}>{t('task_popup.desc')}</DialogTitle>
      <Box className={styles.description}>
        {!input && <DialogContentText>{description.split(' <!> ')[0]}</DialogContentText>}
        {input && (
          <TextField
            variant="filled"
            multiline
            defaultValue={description.split(' <!> ')[0]}
            onChange={handleInput}
            sx={{
              width: '100%',
              '@media (max-width: 610px)': { width: '100%' },
              overflowY: 'visible',
            }}
          />
        )}
        {!input && (
          <Button
            size="small"
            variant="contained"
            onClick={handleClick}
            sx={{ maxWidth: '200px', marginTop: '20px' }}
          >
            {t('settings.change_btn')}
          </Button>
        )}
        {input && <DialogControls onConfirm={handleSubmit} onCancel={handleClick} />}
      </Box>
    </DialogContent>
  );
};

export default TaskDescription;
