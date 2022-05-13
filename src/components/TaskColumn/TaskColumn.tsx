import { Box, Divider, Typography } from '@mui/material';
import { ITaskResponse } from '../../interfaces/apiInterfaces';
import styles from './style.module.scss';

type Props = ITaskResponse;

const TaskColumn = ({ id, title, order }: Props) => {
  return (
    <Box style={{ order }} className={styles['task-container']}>
      <Typography className={styles['task-title']}>{title}</Typography>
      <Divider style={{ order }} orientation="horizontal" flexItem />
    </Box>
  );
};

export default TaskColumn;
