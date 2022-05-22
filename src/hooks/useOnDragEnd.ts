import { DropResult } from '@react-forked/dnd';
import { IBoard, IFullTask } from '../interfaces/apiInterfaces';
import { updateColumns, updateColumnTasks } from '../store/reducers/boardSlice';
import { useUpdateColumnMutation } from '../store/services/columnsService';
import { useSetTasksMutation } from '../store/services/tasksService';
import { makeOrderedArrayWithReplace } from '../utils/functions';
import { useTypedDispatch } from './redux';

export const useOnDragEnd = (board: IBoard, boardId: string) => {
  const [setTasks] = useSetTasksMutation();
  const dispatch = useTypedDispatch();
  const [updateColumnsApi] = useUpdateColumnMutation();

  const setUpdatedTasksToApi = (tasks: IFullTask[]) => {
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
    setTasks(updatedTasks)
      .unwrap()
      .catch((e) => e);
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
        .unwrap()
        .catch((e) => e)
    );
  };

  const onDragTaskBetweenColumns = (
    columnFrom: IFullTask[],
    columnTo: IFullTask[],
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
    columnFrom: IFullTask[],
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
    if (type === 'list') {
      onDragColumns(source.index, destination.index);
      return;
    }
    const columnFrom = board.columns.find((column) => column._id === source.droppableId)?.tasks;
    const columnTo = board.columns.find((column) => column._id === destination.droppableId)?.tasks;
    if (columnFrom && destination.droppableId === source.droppableId) {
      onDragTaskInsideColumn(columnFrom, source.index, destination.index, source.droppableId);
      return;
    }
    if (columnFrom && columnTo && destination.droppableId !== source.droppableId) {
      onDragTaskBetweenColumns(
        columnFrom,
        columnTo,
        source.index,
        destination.index,
        source.droppableId,
        destination.droppableId
      );
      return;
    }
  };

  return (result: DropResult) => onDragEnd(result);
};
