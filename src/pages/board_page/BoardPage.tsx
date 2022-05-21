import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import { DragDropContext, Droppable, DropResult } from '@react-forked/dnd';
import { useAddColumnMutation, useUpdateColumnMutation } from '../../store/services/columnsService';
import { getNewOrder, makeOrderedArrayWithReplace } from '../../utils/functions';
import { useEffect, useState } from 'react';
import { useGetBoardMutation } from '../../store/services/boardsService';
import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import {
  setBoard,
  updateColumns,
  updateColumnTasks,
  resetBoard,
} from '../../store/reducers/boardSlice';
import Loader from '../../components/Loader';
import { useSetTasksMutation } from '../../store/services/tasksService';
import TaskPopup from '../../components/TaskPopup';
import { ITask } from '../../interfaces/apiInterfaces';

const Board = () => {
  const { boardId = '' } = useParams();
  const [getBoard, { isLoading: loadingBoards }] = useGetBoardMutation();
  const { board } = useTypedSelector((state) => state.board);
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const [editId, setEditId] = useState('');
  const activateEdit = (id: string) => setEditId(id);
  const disactivateEdit = () => setEditId('');

  const [addColumn, { isLoading: isLoadingColumn }] = useAddColumnMutation();
  const [updateColumnsApi] = useUpdateColumnMutation();
  const [setTasks] = useSetTasksMutation();

  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [popupTaskData, setPopupTaskData] = useState<ITask>();
  const [popupColumnTitle, setPopupColumnTitle] = useState('');

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

  const toggleTaskOpen = () => {
    setIsTaskOpen((prev) => !prev);
  };

  const setTaskForPopup = (task: ITask, title: string) => {
    setPopupTaskData(task);
    setPopupColumnTitle(title);
  };

  const addColumnCallback = (title: string) => {
    const newColumn = { order: getNewOrder(board.columns), boardId, title };
    addColumn(newColumn).unwrap().then(updateBoard);
  };

  const setUpdatedTasksToApi = (tasks: ITask[]) => {
    const updatedTasks = tasks.map((task) => {
      return {
        _id: task._id,
        title: task.title,
        order: task.order,
        description: task.description,
        userId: task.userId,
        boardId: task.boardId,
        columnId: task.columnId,
        users: task.users,
      };
    });
    setTasks(updatedTasks);
  };

  const onDragColumns = (sourceIndex: number, destinationIndex: number) => {
    const orderedColumns = makeOrderedArrayWithReplace(
      board.columns,
      sourceIndex,
      destinationIndex
    );
    dispatch(updateColumns(orderedColumns));
    orderedColumns.forEach((column) =>
      updateColumnsApi({
        body: {
          title: column.title,
          boardId: boardId,
          order: column.order,
        },
        columnId: column._id,
      })
    );
  };

  const onDragTaskBetweenColumns = (
    columnFrom: ITask[],
    columnTo: ITask[],
    sourceIndex: number,
    destinationIndex: number,
    sourceDroppableId: string,
    destinationDroppableId: string
  ) => {
    const copyColumnFrom = [...columnFrom];
    const copyColumnTo = [...columnTo];
    const [removedItem] = copyColumnFrom.splice(sourceIndex, 1);
    copyColumnTo.splice(destinationIndex, 0, removedItem);
    const orderedColumnTo = copyColumnTo.map((task, index) => ({
      ...task,
      columnId: destinationDroppableId,
      order: index,
    }));
    dispatch(
      updateColumnTasks({
        columnId: sourceDroppableId,
        tasks: copyColumnFrom,
      })
    );
    dispatch(
      updateColumnTasks({
        columnId: destinationDroppableId,
        tasks: orderedColumnTo,
      })
    );
    setUpdatedTasksToApi([...orderedColumnTo, ...copyColumnFrom]);
  };

  const onDragTaskInsideColumn = (
    columnFrom: ITask[],
    sourceIndex: number,
    destinationIndex: number,
    sourceDroppableId: string
  ) => {
    const orderedColumnFrom = makeOrderedArrayWithReplace(
      columnFrom,
      sourceIndex,
      destinationIndex
    );
    dispatch(
      updateColumnTasks({
        columnId: sourceDroppableId,
        tasks: orderedColumnFrom,
      })
    );
    setUpdatedTasksToApi(orderedColumnFrom);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }
    if (type === 'list') return onDragColumns(source.index, destination.index);

    const columnFrom = board.columns.find((column) => column._id === source.droppableId)?.tasks;
    const columnTo = board.columns.find((column) => column._id === destination.droppableId)?.tasks;
    if (columnFrom && destination.droppableId === source.droppableId)
      return onDragTaskInsideColumn(
        columnFrom,
        source.index,
        destination.index,
        source.droppableId
      );

    if (columnFrom && columnTo && destination.droppableId !== source.droppableId)
      return onDragTaskBetweenColumns(
        columnFrom,
        columnTo,
        source.index,
        destination.index,
        source.droppableId,
        destination.droppableId
      );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" droppableId="list" type="list">
        {(provider) => (
          <Box
            className={styles['board-wrapper']}
            {...provider.droppableProps}
            ref={provider.innerRef}
          >
            <Stack direction={'row'} spacing={1} className={styles['board']} mt={2} mb={2}>
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
                    disactivateEdit={disactivateEdit}
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
  );
};

export default Board;
