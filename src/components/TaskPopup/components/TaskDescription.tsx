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
import styles from '../style.module.scss';

const TaskDescription: React.FC<{ description: string }> = ({ description }) => {
  const [input, setInput] = useState(false);

  const handleClick = () => setInput((prev) => !prev);

  const handleChange = () => {
    console.log('change description with BE');
    setInput(false);
  };

  return (
    <DialogContent sx={{ padding: '15px 0' }}>
      <DialogTitle sx={{ padding: '0' }}>Description:</DialogTitle>
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
            Change
          </Button>
        )}
        {input && (
          <DialogActions className={styles.description_btns}>
            <Button size="small" variant="contained" onClick={handleChange}>
              Save
            </Button>
            <Button color="error" size="small" variant="contained" onClick={handleClick}>
              Cancel
            </Button>
          </DialogActions>
        )}
      </Box>
    </DialogContent>
  );
};

export default TaskDescription;
