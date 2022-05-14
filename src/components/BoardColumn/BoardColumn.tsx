import { Add } from '@mui/icons-material';
import { Stack, Divider, Box, Button, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';
import { IColumnResponse, ITaskResponse } from '../../interfaces/apiInterfaces';
import ChangeColumnTitle from './components/ChangeColumnTitle';
import ColumnTitle from './components/ColumnTitle';
import { useAddTaskMutation, useGetTasksQuery } from '../../store/services/tasksService';
import TaskColumn from '../TaskColumn';
import { getNewOrder } from '../../utils/functions';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { useTypedSelector } from '../../hooks/redux';
import Loader from '../Loader';
import { Droppable, DroppableProvided } from '@react-forked/dnd';
import { useEffect, useState } from 'react';
interface Props extends IColumnResponse {
  boardId: string;
  editId: string;
  activateEdit: (id: string) => void;
  disactivateEdit: () => void;
}

/*
    {
        "_id": "627fad53810024fca5d861bb",
        "title": "Dnd Task 1? column 1",
        "order": 1,
        "description": "Тестовая таска 1",
        "userId": "627bacb62e3447fd8b1a79c5",
        "boardId": "627fabfd810024fca5d861b1",
        "columnId": "627fac5b810024fca5d861b4",
        "users": []
    },
*/

interface IGetAllTasks {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: [];
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
  // const { data = [] } = useGetTasksQuery({ boardId, columnId: id });

  const [data, setData] = useState<IGetAllTasks[]>([]);
  const url = `https://project-manager-by-troitskiy.herokuapp.com/boards/627fabfd810024fca5d861b1/columns/627fac5b810024fca5d861b4/tasks`;
  const headers = {
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2VhMzMwNzE3ZWVjYjRiMzY3Y2MzNSIsImxvZ2luIjoi0KTQtdC00Y8iLCJpYXQiOjE2NTI1MzQxMjcsImV4cCI6MTY1MjU3NzMyN30.mLFqFJo0A7D_q4Q9sVnqIPCO4KV5Oor2NfkYU_ISaoE',
  };
  useEffect(() => {
    const fetchFunc = async () => {
      const fetchData = await fetch(url, { headers });
      const data = (await fetchData.json()) as IGetAllTasks[];
      setData(data);
      console.log(data);
    };
    fetchFunc();
  }, []);

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
        <Stack direction={'column'} spacing={1} className={`${styles['column']}`}>
          <Droppable droppableId={id} direction="vertical">
            {(droppableProvided: DroppableProvided) => (
              <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                {data.map((item, index) => (
                  <TaskColumn
                    key={item['_id']}
                    index={index}
                    id={item['_id']}
                    order={item.order}
                    title={item.title}
                    description={item.description}
                    boardId={item.boardId}
                    columnId={item.columnId}
                    userId={item.userId}
                  />
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
  );
};

BoardColumn.defaultProps = {
  boardId: '',
};

export default BoardColumn;
