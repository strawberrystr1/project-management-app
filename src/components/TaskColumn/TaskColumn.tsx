import { Box, Divider, Typography } from '@mui/material';
import { ITaskResponse } from '../../interfaces/apiInterfaces';
import styles from './style.module.scss';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@react-forked/dnd';

type Props = ITaskResponse;

const TaskColumn = ({ id, title, order, index }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
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
