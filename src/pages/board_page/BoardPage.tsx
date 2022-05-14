import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import { useAddColumnMutation, useGetColumnsQuery } from '../../store/services/columnsService';
import { DragDropContext, DropResult, ResponderProvided } from '@react-forked/dnd';

import { getNewOrder } from '../../utils/functions';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { IColumnResponse } from '../../interfaces/apiInterfaces';

export interface IColumnResponse1 {
  _id: string;
  order: number;
  title: string;
}

/*
boardId: "627fabfd810024fca5d861b1"
columnId: "627fac5b810024fca5d861b4"
description: "Тестовая таска 21"
order: 2
title: "Dnd Task 2? column 1"
userId: "627bacb62e3447fd8b1a79c5"
users: []
_id: "627fad5e810024fca5d861bd"
*/

const arrayTasks = [
  {
    _id: '627fad53810024fca5d861bb',
    title: 'Тестовая таска 111',
    order: 1,
    description: 'Тестовая таска 1',
    userId: '62750f07e7df074e0299187f',
    boardId: '627fabfd810024fca5d861b1',
    columnId: '627fac5b810024fca5d861b4',
    users: ['627bacb62e3447fd8b1a79c5'],
  },
  {
    _id: '627fad5e810024fca5d861bd',
    title: 'Тестовая таска 222',
    order: 2,
    description: 'Тестовая таска 2',
    userId: '62750f07e7df074e0299187f',
    boardId: '627fabfd810024fca5d861b1',
    columnId: '627fac5b810024fca5d861b4',
    users: ['627bacb62e3447fd8b1a79c5'],
  },
];

const Board = () => {
  const { boardId } = useParams();
  // const { data = [] } = useGetColumnsQuery({ id: String(boardId) });
  const { t } = useTranslation();
  const [editId, setEditId] = useState('');
  const activateEdit = (id: string) => setEditId(id);
  const disactivateEdit = () => setEditId('');

  const [data, setData] = useState<IColumnResponse1[]>([]);

  const url = `https://project-manager-by-troitskiy.herokuapp.com/boards/${boardId}/columns`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2VhMzMwNzE3ZWVjYjRiMzY3Y2MzNSIsImxvZ2luIjoi0KTQtdC00Y8iLCJpYXQiOjE2NTI1MzQxMjcsImV4cCI6MTY1MjU3NzMyN30.mLFqFJo0A7D_q4Q9sVnqIPCO4KV5Oor2NfkYU_ISaoE',
  };

  // 627fabfd810024fca5d861b1
  useEffect(() => {
    const fetchFunc = async () => {
      const fetchData = await fetch(url, { headers });
      const data = (await fetchData.json()) as IColumnResponse1[];
      const result = [];
      result.push(data[0]);
      setData(result);
    };
    fetchFunc();
  }, [boardId]);

  const [addColumn, { isLoading }] = useAddColumnMutation();

  const addColumnCallback = (title: string) => {
    addColumn({ order: getNewOrder(data), id: String(boardId), title });
  };

  const onDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // todo
    const fetchData = async () => {
      const url = `https://project-manager-by-troitskiy.herokuapp.com/tasksSet`;
      const body = { tasks: arrayTasks };
      console.log('body', body);
      const fetchData = await fetch(url, { headers, method: 'PATCH', body: JSON.stringify(body) });
    };
    // fetchData();

    console.log('source.droppableId', source.droppableId);
    console.log('destination.droppableId', destination.droppableId);
    console.log('********');

    console.log('source.index', source.index);
    console.log('destination.index', destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className={styles['board-wrapper']}>
        <Stack direction={'row'} spacing={1} className={styles['board']} mt={2} mb={2}>
          <Stack direction={'row'} spacing={1}>
            {data.map(({ _id, order, title }) => (
              <BoardColumn
                key={_id}
                id={_id}
                order={order}
                title={title}
                boardId={boardId}
                editId={editId}
                activateEdit={activateEdit}
                disactivateEdit={disactivateEdit}
              />
            ))}
          </Stack>

          {isLoading ? (
            <Loader />
          ) : (
            <DialogButton
              type="new_column"
              btn={(handleOpenDialog, type) => (
                <Button
                  onClick={handleOpenDialog}
                  className={styles['new-column-btn']}
                  color="info"
                  endIcon={<Add />}
                >
                  {t(`buttons.${type}`)}
                </Button>
              )}
              form={(handleCloseDialog) => (
                <CreateColumnForm handleClose={handleCloseDialog} addColumn={addColumnCallback} />
              )}
            />
          )}
        </Stack>
      </Box>
    </DragDropContext>
  );
};

export default Board;
