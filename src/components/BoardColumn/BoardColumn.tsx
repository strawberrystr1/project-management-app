import { Add } from '@mui/icons-material';
import { Stack, Container, Divider, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';

type Props = {
  order: number;
};

const BoardColumn = ({ order }: Props) => {
  const { t } = useTranslation();
  return (
    <Container
      style={{ order: order, display: 'flex', flexDirection: 'column' }}
      className={styles['column-container']}
    >
      <Typography variant="h6" className={styles['column-title']}>
        Title + {order}
      </Typography>
      <Stack
        direction={'column'}
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={0}
        className={styles['column']}
      >
        <DialogButton
          type="new_task"
          btn={(h, type) => (
            <Button onClick={h} className={styles['new-task-btn']} endIcon={<Add />}>
              {t(`buttons.${type}`)}
            </Button>
          )}
          form={(h) => <CreateTaskForm handleClose={h} />}
        />
        <Box className={styles['column-item']}>Item 1</Box>
        <Box className={styles['column-item']}>Item 2</Box>
        <Box className={styles['column-item']}>Item 3</Box>
      </Stack>
    </Container>
  );
};

export default BoardColumn;
