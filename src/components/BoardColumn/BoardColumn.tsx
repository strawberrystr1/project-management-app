import { Stack, Container, Divider, Box, Typography } from '@mui/material';
import styles from './style.module.scss';

type Props = {
  order: number;
};

const BoardColumn = ({ order }: Props) => {
  return (
    <Container style={{ order: order }}>
      <Typography variant="h6" className={styles['column-title']}>
        Title + {order}
      </Typography>
      <Stack
        direction={'column'}
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={0}
        className={styles['column']}
      >
        <Box className={styles['column-item']}>Item 1</Box>
        <Box className={styles['column-item']}>Item 2</Box>
        <Box className={styles['column-item']}>Item 3</Box>
      </Stack>
    </Container>
  );
};

export default BoardColumn;
