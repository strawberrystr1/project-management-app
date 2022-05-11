import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useGetColumnsQuery } from '../../store/services/columnsService';

import { getNewOrder } from '../../utils/functions';

const Board = () => {
  const { boardId } = useParams();
  const { data = [] } = useGetColumnsQuery({ id: String(boardId) });
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box className={styles['board-wrapper']}>
      <Button
        color="secondary"
        aria-label="back page"
        className={styles['back-page-button']}
        size="medium"
        startIcon={<ArrowBackIosOutlinedIcon fontSize="small" />}
        onClick={() => navigate('/boards')}
      >
        {t('buttons.back')}
      </Button>
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
