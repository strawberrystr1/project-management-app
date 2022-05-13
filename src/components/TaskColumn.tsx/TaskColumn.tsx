import { Box, Paper, Typography } from '@mui/material';
import { ITaskResponse } from '../../interfaces/apiInterfaces';
import styles from './style.module.scss';

type Props = ITaskResponse;

const TaskColumn = ({ id, title }: Props) => {
  return (
    <Box className={styles['task-container']}>
      <Typography className={styles['task-title']}>{title}</Typography>
    </Box>
  );
};

export default TaskColumn;
