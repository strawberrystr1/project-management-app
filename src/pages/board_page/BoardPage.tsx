import { Add } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoardColumn from '../../components/BoardColumn';
import CreateColumnForm from '../../components/CreateColumnForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';

const Board = () => {
  const { t } = useTranslation();
  return (
    <Stack direction={'row'} spacing={1} className={styles['board']}>
      <DialogButton
        type="new_column"
        btn={(h, type) => (
          <Button onClick={h} className={styles['new-column-btn']} endIcon={<Add />}>
            {t(`buttons.${type}`)}
          </Button>
        )}
        form={(h) => <CreateColumnForm handleClose={h} />}
      />
      {[10, 15].map((item) => (
        <BoardColumn key={item} order={item} />
      ))}
    </Stack>
  );
};

export default Board;
