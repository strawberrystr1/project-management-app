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
import { useGetBoardById2Mutation } from '../../store/services/boardsService';
import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import { setBoard } from '../../store/reducers/boardSlice';

const Board = () => {
  const { boardId = '' } = useParams();
  const [getBoard] = useGetBoardById2Mutation();
  const { board } = useTypedSelector((state) => state.board);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    getBoard(boardId)
      .unwrap()
      .then((data) => {
        dispatch(setBoard(data));
      });
  }, [boardId]);

  const { t } = useTranslation();
  const [editId, setEditId] = useState('');
  const activateEdit = (id: string) => setEditId(id);
  const disactivateEdit = () => setEditId('');

  const [addColumn] = useAddColumnMutation();

  const addColumnCallback = (title: string) => {
    // addColumn({ order: getNewOrder((board.columns = [])), _id: boardId, title });
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
                title={title}
                tasks={tasks}
                editId={editId}
                activateEdit={activateEdit}
                disactivateEdit={disactivateEdit}
              />
            ))}
        </Stack>
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
      </Stack>
    </Box>
  );
};

export default Board;
