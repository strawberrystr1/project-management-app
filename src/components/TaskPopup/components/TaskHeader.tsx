import { DialogTitle, Box, DialogContentText, DialogContent, Avatar } from '@mui/material';
import { stringAvatar } from '../../../utils/functions';
import styles from '../style.module.scss';

const TaskHeader: React.FC<{ title: string; column: string; user: string }> = ({ title }) => {
  const column = {
    title: 'Done',
  };

  const user = {
    name: 'A S',
  };

  return (
    <DialogContent sx={{ padding: '0' }}>
      <DialogTitle sx={{ padding: '0', fontSize: '24px' }}>{title}</DialogTitle>
      <DialogContentText>in the column - {column.title}</DialogContentText>
      <DialogContentText sx={{ paddingTop: '10px' }}>User asigned to this task:</DialogContentText>
      <Avatar
        sx={{
          width: 30,
          height: 30,
          fontSize: '1em',
        }}
      >
        {stringAvatar(user.name)}
      </Avatar>
    </DialogContent>
  );
};

export default TaskHeader;
