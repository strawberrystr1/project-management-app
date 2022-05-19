import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IColumn, IUpdateColumn, IUpdateColumnTasks } from '../../interfaces/apiInterfaces';

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
      const columns = action.payload.columns
        .map((column) => {
          const unsortedTasks = [...column.tasks];
          return { ...column, tasks: unsortedTasks.sort((a, b) => a.order - b.order) };
        })
        .sort((a, b) => a.order - b.order);
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
    updateColumnTasks(state, action: PayloadAction<IUpdateColumnTasks>) {
      const findColumn = (column: IColumn) => {
        return column._id === action.payload.columnId;
      };
      const column = state.board.columns.find(findColumn);
      if (column) {
        column.tasks = action.payload.tasks
          .sort((a, b) => a.order - b.order)
          .map((task, index) => {
            return { ...task, order: index };
          });
      }
    },
    updateColumns(state, action: PayloadAction<IColumn[]>) {
      const columns = action.payload;
      state.board.columns = columns
        .sort((a, b) => a.order - b.order)
        .map((task, index) => {
          return { ...task, order: index };
        });
    },
      resetBoard: () => initialState,
  },
});

export const { setBoard, changeColumn, removeColumn, updateColumnTasks, updateColumns, resetBoard } =
  boardSlice.actions;

export default boardSlice.reducer;
