import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import { DragDropContext, DropResult, ResponderProvided } from '@react-forked/dnd';
import { useAddColumnMutation } from '../../store/services/columnsService';
import { getNewOrder } from '../../utils/functions';
import { useEffect, useState } from 'react';
import { useGetBoardMutation } from '../../store/services/boardsService';
import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import { setBoard, updateColumnTasks } from '../../store/reducers/boardSlice';
import Loader from '../../components/Loader';
import { useSetTasksMutation } from '../../store/services/tasksService';
import TaskPopup from '../../components/TaskPopup';
import { ITask } from '../../interfaces/apiInterfaces';

const Board = () => {
  const { boardId = '' } = useParams();
  const [getBoard, { isLoading: loadingBoards }] = useGetBoardMutation();
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
  const [setTasks] = useSetTasksMutation(); //todo
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [popupTaskData, setPopupTaskData] = useState<ITask>();
  const [popupColumnTitle, setPopupColumnTitle] = useState('');

  const toggleTaskOpen = () => {
    setIsTaskOpen((prev) => !prev);
  };

  const setTaskForPopup = (task: ITask, title: string) => {
    setPopupTaskData(task);
    setPopupColumnTitle(title);
  };

  const addColumnCallback = (title: string) => {
    const newColumn = { order: getNewOrder(board.columns || []), boardId, title };
    addColumn(newColumn).unwrap().then(updateBoard);
  };

  const onDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // const allTasks = board.columns.map((column) => column.tasks).flat();
    const columnFrom = board.columns.find((column) => column._id === source.droppableId)?.tasks;
    console.log('columnFrom', columnFrom);

    if (!columnFrom) return;
    const copyColumnFrom = [...columnFrom];
    // если колонки одинаковые, то работаем только с columnFrom
    if (destination.droppableId === source.droppableId) {
      // debugger;
      const removedItem = copyColumnFrom.splice(source.index, 1); //deleting item
      copyColumnFrom.splice(destination.index, 0, removedItem[0]); //deleting item
      // todo map change order to current column
      dispatch(updateColumnTasks({ columnId: source.droppableId, tasks: copyColumnFrom }));
      // todo add api method
      return;
    }
    // если колонки разные, то работаем с columnFrom и с columnTo
    const columnTo = board.columns.find((column) => column._id === destination.droppableId)?.tasks;
    // todo
    console.log('board', board);
    console.log('columnTo', columnTo);
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
            {loadingBoards ? (
              <Loader />
            ) : (
              board.columns &&
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
              ))
            )}
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
        {popupTaskData && (
          <TaskPopup
            columnTitle={popupColumnTitle}
            task={popupTaskData}
            open={isTaskOpen}
            handleClose={toggleTaskOpen}
          />
        )}
      </Box>
    </DragDropContext>
  );
};

export default Board;
