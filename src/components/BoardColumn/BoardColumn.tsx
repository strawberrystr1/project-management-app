import { Add } from '@mui/icons-material';
import { Stack, Box, Button, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';
import { IColumn } from '../../interfaces/apiInterfaces';
import ChangeColumnTitle from './components/ChangeColumnTitle';
import ColumnTitle from './components/ColumnTitle';
import { useAddTaskMutation, useGetTasksQuery } from '../../store/services/tasksService';
import TaskColumn from '../TaskColumn';
import { getNewOrder } from '../../utils/functions';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { useTypedSelector } from '../../hooks/redux';
import Loader from '../Loader';

interface Props extends IColumn {
  editId: string;
  activateEdit: (id: string) => void;
  disactivateEdit: () => void;
}

const BoardColumn = ({
  _id,
  order,
  title,
  boardId,
  tasks,
  editId,
  activateEdit,
  disactivateEdit,
}: Props) => {
  const { t } = useTranslation();

  const [addTask] = useAddTaskMutation();
  const addTaskCallback = ({ title, description }: IInitialFormValues) => {
    /* addTask({
      paths: { boardId, columnId: id },
      body: { title, description, order: getNewOrder(data), userId },
    }); */
  };
  return (
    <Box style={{ order }} className={styles['column-container']}>
      <Paper elevation={2} className={styles['column-wrapper']}>
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
          {tasks.map((task) => (
            <TaskColumn key={task._id} _id={task._id} order={task.order} title={task.title} />
          ))}
        </Stack>

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
      </Paper>
    </Box>
  );
};

BoardColumn.defaultProps = {
  boardId: '',
};

export default BoardColumn;
