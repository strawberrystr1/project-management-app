import { Add } from '@mui/icons-material';
import { Stack, Divider, Box, Button, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';
import { IColumnResponse } from '../../interfaces/apiInterfaces';
import ChangeColumnTitle from './components/ChangeColumnTitle';
import ColumnTitle from './components/ColumnTitle';
import { useAddTaskMutation, useGetTasksQuery } from '../../store/services/tasksService';
import TaskColumn from '../TaskColumn.tsx';
import { getNewOrder } from '../../utils/functions';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { useTypedSelector } from '../../hooks/redux';
import Loader from '../Loader';

interface Props extends IColumnResponse {
  boardId: string;
  editId: string;
  activateEdit: (id: string) => void;
  disactivateEdit: () => void;
}

const BoardColumn = ({
  id,
  order,
  title,
  boardId,
  editId,
  activateEdit,
  disactivateEdit,
}: Props) => {
  const { t } = useTranslation();
  const { data = [] } = useGetTasksQuery({ boardId, columnId: id });

  const { userId } = useTypedSelector((state) => state.user);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const addTaskCallback = ({ title, description }: IInitialFormValues) => {
    addTask({
      paths: { boardId, columnId: id },
      body: { title, description, order: getNewOrder(data), userId },
    });
  };
  return (
    <Box style={{ order }} className={styles['column-container']}>
      <Paper elevation={2} className={styles['column-wrapper']}>
        <Box className={styles['title-container']}>
          {editId === id ? (
            <ChangeColumnTitle
              currentTitle={title}
              disactivateEdit={disactivateEdit}
              boardId={boardId}
              columnId={id}
              order={order}
            />
          ) : (
            <ColumnTitle
              currentTitle={title}
              activateEdit={() => activateEdit(id)}
              boardId={boardId}
              columnId={id}
            />
          )}
        </Box>
        <Stack
          direction={'column'}
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={1}
          className={`${styles['column']}`}
        >
          {data.map((item) => (
            <TaskColumn
              key={item.id}
              id={item.id}
              order={item.order}
              title={item.title}
              description={item.description}
              boardId={item.boardId}
              columnId={item.columnId}
              userId={item.userId}
            />
          ))}
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
  );
};

BoardColumn.defaultProps = {
  boardId: '',
};

export default BoardColumn;
