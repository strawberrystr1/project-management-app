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
import { useCreateColumnMutation, useGetColumnsForBoardQuery } from '../../store/services/newBE';

export interface IColumnResponse1 {
  _id: string;
  order: number;
  title: string;
}

const Board = () => {
  const { boardId } = useParams();
  // const { data = [] } = useGetColumnsQuery({ id: String(boardId) });
  const { data: columnData } = useGetColumnsForBoardQuery(boardId as string);
  const { t } = useTranslation();
  const [editId, setEditId] = useState('');
  const activateEdit = (id: string) => setEditId(id);
  const disactivateEdit = () => setEditId('');

  const [createColumn, { data: colResp, isLoading }] = useCreateColumnMutation();
  const [data, setData] = useState<IColumnResponse1[]>([]);

  const url = `http://localhost:3001/boards/${boardId}/columns`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODBiMmNhYzc3OGI5YzE3ZmZkMTk2NCIsImxvZ2luIjoidGVzdCIsImlhdCI6MTY1MjYwMTU2MywiZXhwIjoxNjUyNjQ0NzYzfQ.mTNPQ9SCbrEFkZxpufDFczbji-cbhBGqdxbuMdOZKjw',
  };

  useEffect(() => {
    setData(columnData);
  }, [columnData]);

  const addColumnCallback = (title: string) => {
    const body = {
      boardId,
      body: {
        order: getNewOrder(data),
        title,
        boardId,
      },
    };
    createColumn(body);
  };

  const onDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    const { source, destination, draggableId } = result;
    console.log('result: ', result);
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // todo
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
            {data &&
              data.map(({ _id, order, title }) => (
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
