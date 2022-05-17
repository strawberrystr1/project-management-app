import { Box, Divider, Typography } from '@mui/material';
import { ITask } from '../../interfaces/apiInterfaces';
import styles from './style.module.scss';

type Props = Pick<ITask, '_id' | 'title' | 'order'>;

const TaskColumn = ({ _id, title, order }: Props) => {
  return (
    <Box style={{ order }} className={styles['task-container']}>
      <Typography className={styles['task-title']}>{title}</Typography>
      <Divider style={{ order }} orientation="horizontal" flexItem />
    </Box>
  );
};

export default TaskColumn;
