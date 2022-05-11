import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import { useGetColumnsQuery } from '../../store/services/columnsService';

import { getNewOrder } from '../../utils/functions';

const Board = () => {
  const { boardId } = useParams();
  const { data = [] } = useGetColumnsQuery({ id: String(boardId) });
  const { t } = useTranslation();

  return (
    <Box className={styles['board-wrapper']}>
      <Stack direction={'row'} spacing={1} className={styles['board']} mt={1}>
        <Stack direction={'row'} spacing={1}>
          {data.map(({ id, order, title }) => (
            <BoardColumn key={id} id={id} order={order} title={title} boardId={boardId} />
          ))}
        </Stack>
        <DialogButton
          type="new_column"
          btn={(handleOpenDialog, type) => (
            <Button
              onClick={handleOpenDialog}
              className={styles['new-column-btn']}
              color="info"
              endIcon={<Add />}
            >
              {t(`buttons.${type}`)}
            </Button>
          )}
          form={(handleCloseDialog) => (
            <CreateColumnForm
              handleClose={handleCloseDialog}
              order={getNewOrder(data)}
              boardId={boardId}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default Board;
