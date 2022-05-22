import { Box, Divider, Typography } from '@mui/material';
import styles from './style.module.scss';
import { Draggable, DraggableProvided } from '@react-forked/dnd';

type Props = {
  _id: string;
  title: string;
  toggleTaskOpen: () => void;
  index: number;
};

const TaskColumn = ({ _id, title, toggleTaskOpen, index }: Props) => {
  const splited = title.split('<!>');
  return (
    <Draggable draggableId={_id} index={index}>
      {(draggableProvided: DraggableProvided) => (
        <Box
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          style={{
            ...draggableProvided.draggableProps.style,
          }}
          className={styles['task-container']}
          onClick={toggleTaskOpen}
        >
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
          <Divider orientation="horizontal" flexItem />
        </Box>
      )}
    </Draggable>
  );
};

export default TaskColumn;
