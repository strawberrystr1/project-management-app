import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
  ResponderProvided,
} from '@react-forked/dnd';
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

  const onDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    console.log('type', type);
    const columnFrom = board.columns.find((column) => column._id === source.droppableId)?.tasks;
    const columnTo = board.columns.find((column) => column._id === destination.droppableId)?.tasks;
    if (type === 'tasks') {
      // если колонки одинаковые, то работаем только с columnFrom
      if (columnFrom && destination.droppableId === source.droppableId) {
        const copyColumnFrom = [...columnFrom];
        const removedItem = copyColumnFrom.splice(source.index, 1); //deleted item
        copyColumnFrom.splice(destination.index, 0, removedItem[0]);
        const orderedColumnFrom = copyColumnFrom.map((task, index) => ({ ...task, order: index }));
        // update state
        dispatch(
          updateColumnTasks({
            columnId: source.droppableId,
            tasks: orderedColumnFrom,
          })
        );
        // update api
        setUpdatedTasksToApi(orderedColumnFrom);
        return;
      }
      //todo если колонки разные, то работаем с columnFrom и с columnTo

      if (columnFrom && columnTo && destination.droppableId !== source.droppableId) {
        const copyColumnFrom = [...columnFrom];
        const copyColumnTo = [...columnTo];
        const [removedItem] = copyColumnFrom.splice(source.index, 1); //deleted item
        copyColumnTo.splice(destination.index, 0, removedItem);
        const orderedColumnTo = copyColumnTo.map((task, index) => ({
          ...task,
          columnId: destination.droppableId,
          order: index,
        }));
        // update state
        dispatch(
          updateColumnTasks({
            columnId: source.droppableId,
            tasks: copyColumnFrom,
          })
        );
        dispatch(
          updateColumnTasks({
            columnId: destination.droppableId,
            tasks: orderedColumnTo,
          })
        );
        // update api
        setUpdatedTasksToApi([...orderedColumnTo, ...copyColumnFrom]);
        return;
      }
    }
  };

  /*
              <Stack direction={'column'} spacing={1} className={`${styles['column']}`}>
              <Droppable droppableId={_id} type="tasks" direction="vertical">
                {(droppableProvided: DroppableProvided) => (
                  <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                    {sortedTasks.map((task, index) => (
                      <Box onClick={() => setTaskForPopup(task, title)} key={task._id}>
                        <TaskColumn
                          _id={task._id}
                          title={task.title}
                          toggleTaskOpen={toggleTaskOpen}
                          index={index}
                        />
                      </Box>
                    ))}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </Stack>
  */

  /*
             <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map(cardID => cards[cardID]);

                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              })}
              {provided.placeholder}
              <TrelloCreate list />
            </ListsContainer>
          )}
        </Droppable>
            */

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className={styles['board-wrapper']}>
        {loadingBoards && isLoading ? (
          <Loader />
        ) : (
          <Droppable droppableId="columns" type="columns" direction="horizontal">
            {(droppableProvided: DroppableProvided) => (
              <Stack
                direction={'row'}
                spacing={1}
                className={styles['board']}
                mt={2}
                mb={2}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {board.columns &&
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
                  ))}
                {droppableProvided.placeholder}
              </Stack>
            )}
          </Droppable>
        )}
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
