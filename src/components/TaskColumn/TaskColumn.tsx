import { Box, Divider, Typography } from '@mui/material';
import styles from './style.module.scss';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@react-forked/dnd';

type Props = { _id: string; title: string; order: number; index: number };

const TaskColumn = ({ _id, title, order, index }: Props) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Box
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          style={{
            ...draggableProvided.draggableProps.style,
            // backgroundColor: snapshot.isDragging ? 'red' : null,
            order,
          }}
          className={styles['task-container']}
          onClick={() => console.log('open Cards')}
        >
          <Typography className={styles['task-title']}>{title}</Typography>
          <Divider style={{ order }} orientation="horizontal" flexItem />
        </Box>
      )}
    </Draggable>
  );
};

export default TaskColumn;
