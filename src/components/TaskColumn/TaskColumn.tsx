import { Box, Divider, Typography } from '@mui/material';
import styles from './style.module.scss';

type Props = {
  _id: string;
  title: string;
  order: number;
  toggleTaskOpen: () => void;
};

const TaskColumn = ({ title, order, toggleTaskOpen }: Props) => {
  return (
    <Box style={{ order }} className={styles['task-container']} onClick={toggleTaskOpen}>
      <Typography className={styles['task-title']}>{title}</Typography>
      <Divider style={{ order }} orientation="horizontal" flexItem />
    </Box>
  );
};

export default TaskColumn;
