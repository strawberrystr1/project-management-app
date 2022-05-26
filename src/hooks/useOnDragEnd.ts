import { DropResult } from '@react-forked/dnd';
import { IBoard, IColumn, IFullTask } from '../interfaces/apiInterfaces';
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

  const onDragColumns = (destinationIndex: number, draggableId: string) => {
    const orderedColumns = makeOrderedArrayWithReplace(
      board.columns,
      destinationIndex,
      draggableId
    ) as IColumn[];
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
    destinationIndex: number,
    sourceDroppableId: string,
    destinationDroppableId: string,
    draggableId: string
  ) => {
    const copyColumnFrom = [...columnFrom];
    const copyColumnTo = [...columnTo];
    const sourceIndex = copyColumnFrom.findIndex((task) => task._id === draggableId);
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
    destinationIndex: number,
    sourceDroppableId: string,
    draggableId: string
  ) => {
    const orderedColumnFrom = makeOrderedArrayWithReplace(
      columnFrom,
      destinationIndex,
      draggableId
    ) as IFullTask[];
    dispatch(
      updateColumnTasks({
        columnId: sourceDroppableId,
        tasks: orderedColumnFrom,
      })
    );
    setUpdatedTasksToApi(orderedColumnFrom);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    if (type === 'list') {
      onDragColumns(destination.index, draggableId);
      return;
    }
    const columnFrom = board.columns.find((column) => column._id === source.droppableId)?.tasks;
    const columnTo = board.columns.find((column) => column._id === destination.droppableId)?.tasks;
    if (columnFrom && destination.droppableId === source.droppableId) {
      onDragTaskInsideColumn(columnFrom, destination.index, source.droppableId, draggableId);
      return;
    }
    if (columnFrom && columnTo && destination.droppableId !== source.droppableId) {
      onDragTaskBetweenColumns(
        columnFrom,
        columnTo,
        destination.index,
        source.droppableId,
        destination.droppableId,
        draggableId
      );
      return;
    }
  };

  return (result: DropResult) => onDragEnd(result);
};
