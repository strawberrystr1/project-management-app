import { Grid, Input, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateBoardForm from '../../components/CreateBoardForm';
import DialogButton from '../../components/layouts/DialogButton';
import AddCard from '../../components/Boards/AddCard';
import BoardCard from '../../components/Boards/BoardCard';
import { useGetBoardsQuery } from '../../store/services/boardsService';
import { ChangeEvent, useEffect, useState } from 'react';
import { IBoard } from '../../interfaces/apiInterfaces';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../../components/ErrorBoundary';

const Boards = () => {
  const { data } = useGetBoardsQuery();
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [search, setSearch] = useState(() => localStorage.getItem('searchBoards-rss') || '');
  const [focused, setFocused] = useState(false);
  const { t } = useTranslation();

  const filterBoards = (data: IBoard[] | undefined, value: string) => {
    data &&
      setBoards(
        data.filter((board) => board.title.toLowerCase().includes(value.toLowerCase().trim()))
      );
  };

  useEffect(() => {
    data && filterBoards(data, search);
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem('searchBoards-rss', value);
    setSearch(value);
    filterBoards(data, value);
  };

  return (
    <ErrorBoundary text={t('errors.default')}>
      <Stack
        position="relative"
        my="20px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Input
          sx={{ paddingLeft: 4, fontSize: '1.2rem' }}
          placeholder={t('boards.search_board')}
          value={search}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Box position="absolute" sx={{ left: 0, top: 8 }}>
          <SearchIcon fontSize="small" color={focused ? 'primary' : 'inherit'} />
        </Box>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} my={5}>
        {boards && boards.map((board) => <BoardCard key={board['_id']} board={board} />)}

        <DialogButton
          type="new_board"
          btn={(handleOpen) => <AddCard handleOpen={handleOpen} />}
          form={(handleClose) => <CreateBoardForm handleClose={handleClose} />}
        />
      </Grid>
    </ErrorBoundary>
  );
};

export default Boards;
