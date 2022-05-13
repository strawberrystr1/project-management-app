import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import TaskDescription from './components/TaskDescription';
import TaskHeader from './components/TaskHeader';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss';

const TaskPopup = () => {
  const [open, setOpen] = useState(false);

  const task = {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    title: 'Task: pet the cat',
    order: 1,
    description: 'Domestic cat needs to be stroked gently',
    userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    boardId: '8d3bad56-ad8a-495d-9500-18ae4d1de8dc',
    columnId: '41344d09-b995-451f-93dc-2f17ae13a4a9',
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Dialog open={open} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <TaskHeader title={task.title} column={task.columnId} user={task.userId} />
          <TaskDescription description={task.description} />
        </DialogContent>
        <Button onClick={handleClose} className={styles.close}>
          <CloseIcon />
        </Button>
      </Dialog>
    </Box>
  );
};

export default TaskPopup;
