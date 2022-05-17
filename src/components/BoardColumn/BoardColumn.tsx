import { Add } from '@mui/icons-material';
import { Stack, Divider, Box, Button, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';
import { IColumnResponse, ITaskResponse } from '../../interfaces/apiInterfaces';
import ChangeColumnTitle from './components/ChangeColumnTitle';
import ColumnTitle from './components/ColumnTitle';
import { useGetTasksQuery } from '../../store/services/tasksService';
import TaskColumn from '../TaskColumn';
import { getNewOrder } from '../../utils/functions';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { useTypedSelector } from '../../hooks/redux';
import Loader from '../Loader';
import { Droppable, DroppableProvided } from '@react-forked/dnd';
import { useEffect, useState } from 'react';
import { useGetTasksForColumnQuery, useAddTaskMutation } from '../../store/services/newBE';
interface Props extends IColumnResponse {
  boardId: string;
  editId: string;
  activateEdit: (id: string) => void;
  disactivateEdit: () => void;
}

export interface IGetAllTasks {
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
  const { data: tasksData } = useGetTasksForColumnQuery({ boardId, columnId: id });
  const [addTask, { data: taskCreateData, isLoading }] = useAddTaskMutation();
  // const url = `https://project-manager-by-troitskiy.herokuapp.com/boards/6280c73a174543cfafc52b58/columns/${id}/tasks`;
  // const headers = {
  //   Accept: 'application/json',
  //   Authorization:
  //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODBiMmNhYzc3OGI5YzE3ZmZkMTk2NCIsImxvZ2luIjoidGVzdCIsImlhdCI6MTY1MjYwMTU2MywiZXhwIjoxNjUyNjQ0NzYzfQ.mTNPQ9SCbrEFkZxpufDFczbji-cbhBGqdxbuMdOZKjw',
  // };
  // const test = async () => {
  //   const columns = {
  //     boardId: '6280c73a174543cfafc52b58',
  //     columnId: '6280de584d98d3ff4d932da1',
  //     description: 'Тестовая таска 1299',
  //     order: 11,
  //     title: 'Тестовая таска 12523123',
  //     userId: '627bacb62e3447fd8b1a79c5',
  //     users: [],
  //   };
  //   console.log(JSON.stringify(columns));
  //   const board = '6280c73a174543cfafc52b58';
  //   const token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODBjNWNiMTc0NTQzY2ZhZmM1MmI0NiIsImxvZ2luIjoidGVzdCIsImlhdCI6MTY1MjYwNjQ5NiwiZXhwIjoxNjUyNjQ5Njk2fQ.ndov7l2UHksllHtLC8IjdmKgIN8K4o3_5dF3oJte_so';
  //   await fetch(
  //     `http://localhost:3001/boards/6280c73a174543cfafc52b58/columns/6280de584d98d3ff4d932da1/tasks`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(columns),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then(console.log);
  // };
  useEffect(() => {
    // const fetchFunc = async () => {
    //   const fetchData = await fetch(url, { headers });
    //   const data = (await fetchData.json()) as IGetAllTasks[];
    //   setData(data.sort((a, b) => a.order - b.order));
    //   console.log(data);
    // };
    // fetchFunc();
    // test();
    // console.log(tasksData);
    const res: IGetAllTasks[] = [];
    tasksData?.forEach((item) => res.push(item));
    tasksData && setData(res.sort((a, b) => a.order - b.order));
  }, [tasksData]);

  const { userId } = useTypedSelector((state) => state.user);
  const addTaskCallback = ({ title, description }: IInitialFormValues) => {
    addTask({
      boardId,
      columnId: id,
      body: {
        title,
        description,
        userId,
        order: getNewOrder(data),
        boardId,
        columnId: id,
        users: [],
      },
    });
    // addTask({
    //   paths: { boardId, columnId: id },
    //   body: { title, description, order: getNewOrder(data), userId },
    // });
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
                {data &&
                  data.map((item, index) => (
                    <TaskColumn
                      key={item._id}
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
