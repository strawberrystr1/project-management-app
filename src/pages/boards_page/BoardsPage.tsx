import { Grid, IconButton, Input, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateBoardForm from '../../components/CreateBoardForm';
import DialogButton from '../../components/layouts/DialogButton';
import AddCard from '../../components/Boards/AddCard';
import BoardCard from '../../components/Boards/BoardCard';
import { useGetBoardsQuery } from '../../store/services/boardsService';

const Boards = () => {
  const { data: boards } = useGetBoardsQuery();

  return (
    <>
      <Stack my="20px" direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
        <Input placeholder="Search" />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} my={5}>
        {boards && boards.map((board) => <BoardCard key={board['_id']} board={board} />)}

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
