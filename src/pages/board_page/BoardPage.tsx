import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import { DragDropContext, Droppable } from '@react-forked/dnd';
import { useAddColumnMutation } from '../../store/services/columnsService';
import { getNewOrder } from '../../utils/functions';
import { useEffect, useState } from 'react';
import { useGetBoardMutation } from '../../store/services/boardsService';
import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import { setBoard, resetBoard } from '../../store/reducers/boardSlice';
import Loader from '../../components/Loader';
import TaskPopup from '../../components/TaskPopup';
import { IFullTask } from '../../interfaces/apiInterfaces';
import { openSuccessSnack } from '../../store/reducers/snackSlice';
import { useOnDragEnd } from '../../hooks/useOnDragEnd';
import { useOnErrorRedirect } from '../../hooks/useOnErrorRedirect';
import FilterBar from '../../components/BoardFilterBar/FilterBar';
import ErrorBoundary from '../../components/ErrorBoundary';

const Board = () => {
  const { boardId = '' } = useParams();
  const [getBoard, { isLoading: loadingBoards, isError: isBoardError }] = useGetBoardMutation();
  const { board } = useTypedSelector((state) => state.board);
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const [editId, setEditId] = useState('');
  const activateEdit = (id: string) => setEditId(id);
  const deactivateEdit = () => setEditId('');
  const [addColumn, { isLoading: isLoadingColumn }] = useAddColumnMutation();
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [popupTaskData, setPopupTaskData] = useState<IFullTask>();
  const [popupColumnTitle, setPopupColumnTitle] = useState('');

  const updateBoard = () => {
    getBoard(boardId)
      .unwrap()
      .then((data) => {
        dispatch(setBoard(data));
      })
      .catch((e) => e);
  };

  useOnErrorRedirect(isBoardError);

  useEffect(updateBoard, [boardId]);

  useEffect(() => {
    return () => {
      dispatch(resetBoard());
    };
  }, []);

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
    addColumn(newColumn)
      .unwrap()
      .then(updateBoard)
      .catch((e) => e);
    dispatch(openSuccessSnack(t('snack_message.add_column')));
  };

  const onDragEnd = useOnDragEnd(board, boardId);

  return (
    <ErrorBoundary text={t('errors.default')}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack
          sx={{ display: { xs: 'none', md: 'flex' } }}
          minHeight={95}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={2}
        >
          <FilterBar />
        </Stack>

        <Droppable direction="horizontal" droppableId="list" type="list">
          {(provider) => (
            <Box
              className={styles['board-wrapper']}
              {...provider.droppableProps}
              ref={provider.innerRef}
            >
              <Stack direction={'row'} spacing={1} className={styles['board']} mb={2}>
                {loadingBoards || isLoadingColumn ? (
                  <Loader />
                ) : (
                  board.columns &&
                  board.columns.map(({ _id, order, title, tasks }, index) => (
                    <BoardColumn
                      key={_id}
                      _id={_id}
                      index={index}
                      order={order}
                      boardId={boardId}
                      title={title}
                      tasks={tasks}
                      editId={editId}
                      activateEdit={activateEdit}
                      deactivateEdit={deactivateEdit}
                      updateBoard={updateBoard}
                      toggleTaskOpen={toggleTaskOpen}
                      setTaskForPopup={setTaskForPopup}
                    />
                  ))
                )}
                {provider.placeholder}
                {loadingBoards || isLoadingColumn ? (
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
                      <CreateColumnForm
                        handleClose={handleCloseDialog}
                        addColumn={addColumnCallback}
                      />
                    )}
                  />
                )}
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
          )}
        </Droppable>
      </DragDropContext>
    </ErrorBoundary>
  );
};

export default Board;
