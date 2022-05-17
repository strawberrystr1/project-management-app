import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBoard,
  IColumn,
  ITask,
  IUpdateColumn,
  IUpdateColumnTasks,
  IUpdateColumnTasks1,
} from '../../interfaces/apiInterfaces';

type BoardState = {
  board: IBoard;
};

const initialState: BoardState = {
  board: {
    owner: '',
    title: '',
    users: [],
    _id: '',
    columns: [],
  },
};

export const boardSlice = createSlice({
  name: 'boardById',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<IBoard>) {
      // state.board = action.payload;
      const columns = action.payload.columns.map((column) => {
        const unsortedTasks = [...column.tasks];
        return { ...column, tasks: unsortedTasks.sort((a, b) => a.order - b.order) };
      });
      state.board = { ...action.payload, columns };
    },
    changeColumn(state, action: PayloadAction<IUpdateColumn>) {
      const index = state.board.columns.findIndex((item) => item._id === action.payload.columnId);
      state.board.columns[index].title = action.payload.body.title;
      state.board.columns[index].order = action.payload.body.order;
    },
    removeColumn(state, action: PayloadAction<string>) {
      const index = state.board.columns.findIndex((item) => item._id === action.payload);
      state.board.columns.splice(index, 1);
    },
    updateColumnTasks1(state, action: PayloadAction<IUpdateColumnTasks1>) {
      const findColumn = (column: IColumn) => {
        return column._id === action.payload.columnId;
      };
      const column = state.board.columns.find(findColumn);
      if (column) {
        column.tasks = action.payload.tasks.sort((a, b) => a.order - b.order);
      }
    },
    // updateColumnTasks(state, action: PayloadAction<IUpdateColumnTasks>) {
    //   const { columnIdSource, columnIdDestination, indexSource, indexDestination } = action.payload;
    //   const columnFrom = state.board.columns.find((column) => column._id === columnIdSource);

    //   if (!columnFrom) return;
    //   const columnFromTasks = columnFrom.tasks;
    //   // если колонки одинаковые, то работаем только с columnFromTasks
    //   if (columnIdDestination === columnIdSource) {
    //     const removedItem = columnFromTasks.splice(indexSource, 1); //deleting item
    //     columnFromTasks.splice(indexDestination, 0, removedItem[0]); //replacing deleting item
    //     columnFrom.tasks = columnFromTasks;
    //   }
    // },
  },
});

export const { setBoard, changeColumn, removeColumn, updateColumnTasks1 } = boardSlice.actions;

export default boardSlice.reducer;
