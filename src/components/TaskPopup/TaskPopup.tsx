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
    description: 'Domestic cat needs to be stroked gently veru vewr werwe werwer',
    userId: '5b818181-8afb-46e0-903c-dd0190f8705c',
    boardId: '8c4602af-9393-4476-907c-c0f7a7a4b632',
    columnId: '8ee15c2d-578b-4edb-b02d-0a42669c579a',
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Dialog open={open} maxWidth="md" fullWidth={true} onClose={handleClose}>
        <DialogContent>
          <TaskHeader
            title={task.title}
            column={task.columnId}
            user={task.userId}
            board={task.boardId}
          />
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
