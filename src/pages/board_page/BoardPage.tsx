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
import { setBoard, resetBoard } from '../../store/reducers/boardSlice';
import Loader from '../../components/Loader';
import TaskPopup from '../../components/TaskPopup';
import { IFullTask } from '../../interfaces/apiInterfaces';

const Board = () => {
  const { boardId = '' } = useParams();
  const [getBoard, { isLoading }] = useGetBoardMutation();
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
  useEffect(() => {
    return () => {
      dispatch(resetBoard());
    };
  }, []);

  const { t } = useTranslation();
  const [editId, setEditId] = useState('');
  const activateEdit = (id: string) => setEditId(id);
  const disactivateEdit = () => setEditId('');

  const [addColumn, { isLoading: isLoadingColumn }] = useAddColumnMutation();
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [popupTaskData, setPopupTaskData] = useState<IFullTask>();
  const [popupColumnTitle, setPopupColumnTitle] = useState('');

  useEffect(() => {
    if (popupTaskData) {
      const id = popupTaskData._id;
      const column = board.columns.find((item) => item.tasks.find((el) => el._id === id));
      if (column) {
        const task = column.tasks.find((task) => task._id === id);
        setPopupTaskData(task);
      }
    }
  }, [board]);

  const toggleTaskOpen = () => {
    setIsTaskOpen((prev) => !prev);
  };

  const setTaskForPopup = (task: IFullTask, title: string) => {
    setPopupTaskData(task);
    setPopupColumnTitle(title);
  };

  const addColumnCallback = (title: string) => {
    const newColumn = { order: getNewOrder(board.columns), boardId, title };
    addColumn(newColumn).unwrap().then(updateBoard);
  };

  return isLoading || isLoadingColumn ? (
    <Loader />
  ) : (
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
                toggleTaskOpen={toggleTaskOpen}
                setTaskForPopup={setTaskForPopup}
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
      {popupTaskData && (
        <TaskPopup
          columnTitle={popupColumnTitle}
          task={popupTaskData}
          open={isTaskOpen}
          handleClose={toggleTaskOpen}
        />
      )}
    </Box>
  );
};

export default Board;
