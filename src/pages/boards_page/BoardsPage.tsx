import { Grid, IconButton, Input, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateBoardForm from '../../components/CreateBoardForm';
import DialogButton from '../../components/layouts/DialogButton';
import { IBoard } from '../../interfaces/apiInterfaces';
import AddCard from '../../components/Boards/AddCard';
import BoardCard from '../../components/Boards/BoardCard';

// todo
const boardsMock: IBoard[] = [
  { id: '1', title: 'Home tasks (1)' },
  { id: '2', title: 'RSSchool (2)' },
  { id: '3', title: 'React tasks (3)' },
  { id: '4', title: 'Future works (4)' },
  { id: '5', title: 'Vocation (5)' },
  { id: '6', title: 'V5' },
];
// const boardsMock: IBoard[] = [];

const Boards = () => {
  return (
    <>
      <Stack my="20px" direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
        <Input placeholder="Search" />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {boardsMock.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}

        <DialogButton
          type="new_board"
          btn={(handleOpen) => <AddCard handleOpen={handleOpen} />}
          form={(handleClose) => <CreateBoardForm handleClose={handleClose} />}
        />
      </Grid>
    </>
  );
};

export default Boards;
