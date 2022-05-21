import { Box, Divider, Typography } from '@mui/material';
import styles from './style.module.scss';

type Props = {
  _id: string;
  title: string;
  order: number;
  toggleTaskOpen: () => void;
};

const TaskColumn = ({ title, order, toggleTaskOpen }: Props) => {
  const splited = title.split('<!>');
  return (
    <Box style={{ order }} className={styles['task-container']} onClick={toggleTaskOpen}>
      <Typography
        className={styles['task-title']}
        sx={{
          paddingLeft: splited[1] ? '15px' : '0',
          position: 'relative',
          ':before': splited[1] && {
            content: '" "',
            width: '4px',
            height: '90%',
            background: splited[1],
            position: 'absolute',
            left: 0,
            top: 0,
            borderRadius: '4px',
          },
        }}
      >
        {splited[0]}
      </Typography>
      <Divider style={{ order }} orientation="horizontal" flexItem />
    </Box>
  );
};

export default TaskColumn;
