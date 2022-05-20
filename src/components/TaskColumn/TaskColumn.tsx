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
          <Typography className={styles['task-title']}>{title}</Typography>
          <Divider orientation="horizontal" flexItem />
        </Box>
      )}
    </Draggable>
  );
};

export default TaskColumn;
