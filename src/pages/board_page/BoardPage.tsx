import { Stack } from '@mui/material';
import BoardColumn from '../../components/BoardColumn';

const Board = () => {
  return (
    <Stack direction={'row'} mt={1} mb={1} spacing={1}>
      {[10, 1, 2].map((item) => (
        <BoardColumn key={item} order={item} />
      ))}
    </Stack>
  );
};

export default Board;
