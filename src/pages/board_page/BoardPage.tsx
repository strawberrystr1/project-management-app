import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import { useTypedSelector } from '../../hooks/redux';
import styles from './style.module.scss';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const Board = () => {
  const { boardId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { columns } = useTypedSelector((state) => state.board);
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
      <Stack direction={'row'} spacing={1} className={styles['board']}>
        <Stack direction={'row'} spacing={1}>
          {/* JUST AN EXAMPLE */}

          {[10, 15, 5].map((order) => (
            <BoardColumn key={order} id={String(order)} order={order} title={`Title`} />
          ))}

          {/* JUST AN EXAMPLE */}

          {columns.map(({ id, order, title }) => (
            <BoardColumn key={id} id={id} order={order} title={title} />
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
          form={(handleCloseDialog) => <CreateColumnForm handleClose={handleCloseDialog} />}
        />
      </Stack>
    </Box>
  );
};

export default Board;
