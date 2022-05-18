import { Add } from '@mui/icons-material';
import { Stack, Box, Button, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';
import { IColumn, ITask } from '../../interfaces/apiInterfaces';
import ChangeColumnTitle from './components/ChangeColumnTitle';
import ColumnTitle from './components/ColumnTitle';
import { useAddTaskMutation } from '../../store/services/tasksService';
import TaskColumn from '../TaskColumn';
import { getNewOrder } from '../../utils/functions';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { useTypedSelector } from '../../hooks/redux';
import Loader from '../Loader';

import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from '@react-forked/dnd';
interface Props extends IColumn {
  editId: string;
  index: number;
  activateEdit: (id: string) => void;
  disactivateEdit: () => void;
  updateBoard: () => void;
  toggleTaskOpen: () => void;
  setTaskForPopup: (task: ITask, title: string) => void;
}

const BoardColumn = ({
  _id,
  order,
  index,
  title,
  boardId,
  tasks,
  editId,
  activateEdit,
  disactivateEdit,
  updateBoard,
  toggleTaskOpen,
  setTaskForPopup,
}: Props) => {
  const { t } = useTranslation();

  const [addTask, { isLoading }] = useAddTaskMutation();
  const { userId } = useTypedSelector((state) => state.user);
  const { tasks: sortedTasks } = useTypedSelector((state) => state.board.board.columns[index]);

  const addTaskCallback = ({ title, description }: IInitialFormValues) => {
    addTask({
      title,
      description,
      order: getNewOrder(tasks),
      userId,
      boardId,
      columnId: _id,
      users: [],
    })
      .unwrap()
      .then(updateBoard);
  };

  return (
    <Draggable draggableId={_id} index={index}>
      {(draggableProvided: DraggableProvided) => (
        <Box
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          style={{
            ...draggableProvided.draggableProps.style,
            // backgroundColor: snapshot.isDragging ? 'red' : null,
            order,
          }}
          className={styles['column-container']}
        >
          <Paper
            elevation={2}
            className={styles['column-wrapper']}
            sx={{ border: '2px solid red' }}
          >
            <Box className={styles['title-container']}>
              {editId === _id ? (
                <ChangeColumnTitle
                  currentTitle={title}
                  disactivateEdit={disactivateEdit}
                  boardId={boardId}
                  columnId={_id}
                  order={order}
                />
              ) : (
                <ColumnTitle
                  currentTitle={title}
                  activateEdit={() => activateEdit(_id)}
                  boardId={boardId}
                  columnId={_id}
                />
              )}
            </Box>
            <Stack direction={'column'} spacing={1} className={`${styles['column']}`}>
              <Droppable droppableId={_id} type="tasks" direction="vertical">
                {(droppableProvided: DroppableProvided) => (
                  <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                    {sortedTasks.map((task, index) => (
                      <Box onClick={() => setTaskForPopup(task, title)} key={task._id}>
                        <TaskColumn
                          _id={task._id}
                          title={task.title}
                          toggleTaskOpen={toggleTaskOpen}
                          index={index}
                        />
                      </Box>
                    ))}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </Stack>

            {isLoading ? (
              <Loader />
            ) : (
              <DialogButton
                type="new_task"
                btn={(handleOpenDialog, type) => (
                  <Button
                    onClick={handleOpenDialog}
                    className={styles['new-task-btn']}
                    color="warning"
                    endIcon={<Add />}
                  >
                    {t(`buttons.${type}`)}
                  </Button>
                )}
                form={(handleCloseDialog) => (
                  <CreateTaskForm handleClose={handleCloseDialog} addTask={addTaskCallback} />
                )}
              />
            )}
          </Paper>
        </Box>
      )}
    </Draggable>
  );
};

BoardColumn.defaultProps = {
  boardId: '',
};

export default BoardColumn;
