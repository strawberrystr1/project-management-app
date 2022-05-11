import { Add } from '@mui/icons-material';
import { Stack, Divider, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';
import { IColumnResponse } from '../../interfaces/apiInterfaces';
import { useState } from 'react';
import ChangeColumnTitle from './components/ChangeColumnTitle';
import ColumnTitle from './components/ColumnTitle';

interface Props extends IColumnResponse {
  boardId: string;
}

const BoardColumn = ({ id, order, title, boardId }: Props) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => setIsEdit((prev) => !prev);
  return (
    <Box
      style={{ order, display: 'flex', flexDirection: 'column' }}
      className={styles['column-container']}
    >
      <Box className={styles['title-container']}>
        {isEdit ? (
          <ChangeColumnTitle
            currentTitle={title}
            toggleEdit={toggleEdit}
            boardId={boardId}
            columnId={id}
            order={order}
          />
        ) : (
          <ColumnTitle
            currentTitle={title}
            toggleEdit={toggleEdit}
            boardId={boardId}
            columnId={id}
          />
        )}
      </Box>
      <Stack
        direction={'column'}
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={0}
        className={`${styles['column']} container-scroll`}
      >
        {/* JUST AN EXAMPLE */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Box key={item} className={styles['column-item']}>
            Item #{item}
          </Box>
        ))}
        {/* JUST AN EXAMPLE */}
      </Stack>
      <DialogButton
        type="new_task"
        btn={(h, type) => (
          <Button onClick={h} className={styles['new-task-btn']} color="warning" endIcon={<Add />}>
            {t(`buttons.${type}`)}
          </Button>
        )}
        form={(h) => <CreateTaskForm handleClose={h} />}
      />
    </Box>
  );
};

BoardColumn.defaultProps = {
  boardId: '',
};

export default BoardColumn;
