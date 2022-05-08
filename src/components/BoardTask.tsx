import { Stack, styled, Divider, Box } from '@mui/material';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: 10,
  width: 272,
  minWidth: 272,
  height: 'fit-content',
}));

const BoardColumn = () => {
  return (
    <Stack
      direction={'column'}
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={0}
      order={1}
    >
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
};

export default BoardColumn;
