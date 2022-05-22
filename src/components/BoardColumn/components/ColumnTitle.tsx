import { IconButton, Typography } from '@mui/material';
import DialogButton from '../../layouts/DialogButton';
import DialogControls from '../../layouts/DialogControls';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { useDeleteColumnMutation } from '../../../store/services/columnsService';
import styles from './style.module.scss';
import { useTypedDispatch } from '../../../hooks/redux';
import { removeColumn } from '../../../store/reducers/boardSlice';
import { openSuccessSnack } from '../../../store/reducers/snackSlice';
import { useTranslation } from 'react-i18next';

type Props = {
  currentTitle: string;
  activateEdit: () => void;
  boardId: string;
  columnId: string;
};

const ColumnTitle = ({ currentTitle, activateEdit, boardId, columnId }: Props) => {
  const { t } = useTranslation();
  const [deleteColumn] = useDeleteColumnMutation();
  const dispatch = useTypedDispatch();
  const deleteColumnCallback = () => {
    dispatch(removeColumn(columnId));
    deleteColumn({ boardId, columnId })
      .unwrap()
      .catch((e) => e);
    dispatch(openSuccessSnack(t('snack_message.delete_column')));
  };

  return (
    <>
      <Typography className={styles['column-title']} onClick={activateEdit}>
        {currentTitle}
      </Typography>
      <DialogButton
        type="delete_column"
        btn={(handleOpenDialog) => (
          <IconButton
            onClick={handleOpenDialog}
            size="small"
            color="secondary"
            aria-label="delete column"
          >
            <BackspaceOutlinedIcon />
          </IconButton>
        )}
        form={(handleCloseDialog) => (
          <DialogControls onCancel={handleCloseDialog} onConfirm={deleteColumnCallback} />
        )}
      />
    </>
  );
};

export default ColumnTitle;
