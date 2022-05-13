import { Paper, Typography } from '@mui/material';
import { ITaskResponse } from '../../interfaces/apiInterfaces';

type Props = ITaskResponse;

const TaskColumn = ({ id, title }: Props) => {
  return (
    <Paper>
      <Typography>{title}</Typography>
    </Paper>
  );
};

export default TaskColumn;
