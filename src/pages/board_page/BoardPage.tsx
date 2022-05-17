import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import { useAddColumnMutation } from '../../store/services/columnsService';
import { getNewOrder } from '../../utils/functions';
import { useEffect, useState } from 'react';
import { useGetBoardMutation } from '../../store/services/boardsService';
import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import { setBoard } from '../../store/reducers/boardSlice';
import Loader from '../../components/Loader';

const Board = () => {
  const { boardId = '' } = useParams();
  const [getBoard] = useGetBoardMutation();
  const { board } = useTypedSelector((state) => state.board);
  const dispatch = useTypedDispatch();

  const updateBoard = () => {
    getBoard(boardId)
      .unwrap()
      .then((data) => {
        dispatch(setBoard(data));
      });
  };

  useEffect(updateBoard, [boardId]);

  const { t } = useTranslation();
  const [editId, setEditId] = useState('');
  const activateEdit = (id: string) => setEditId(id);
  const disactivateEdit = () => setEditId('');

  const [addColumn, { isLoading }] = useAddColumnMutation();

  const addColumnCallback = (title: string) => {
    const newColumn = { order: getNewOrder(board.columns || []), boardId, title };
    addColumn(newColumn).unwrap().then(updateBoard);
  };

  return (
    <Box className={styles['board-wrapper']}>
      <Stack direction={'row'} spacing={1} className={styles['board']} mt={2} mb={2}>
        <Stack direction={'row'} spacing={1}>
          {board.columns &&
            board.columns.map(({ _id, order, title, tasks }) => (
              <BoardColumn
                key={_id}
                _id={_id}
                order={order}
                boardId={boardId}
                title={title}
                tasks={tasks}
                editId={editId}
                activateEdit={activateEdit}
                disactivateEdit={disactivateEdit}
                updateBoard={updateBoard}
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
  );
};

export default Board;
