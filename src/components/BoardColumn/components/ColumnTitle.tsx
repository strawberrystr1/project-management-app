import { IconButton, Typography } from '@mui/material';
import DialogButton from '../../layouts/DialogButton';
import DialogControls from '../../layouts/DialogControls';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { useDeleteColumnMutation } from '../../../store/services/columnsService';
import styles from './style.module.scss';
import Loader from '../../Loader';

type Props = {
  currentTitle: string;
  activateEdit: () => void;
  boardId: string;
  columnId: string;
};

const ColumnTitle = ({ currentTitle, activateEdit, boardId, columnId }: Props) => {
  const [deleteColumn, { isLoading }] = useDeleteColumnMutation();
  const deleteColumnCallback = () => deleteColumn({ boardId, columnId });

  return (
    <>
      <Typography className={styles['column-title']} onClick={activateEdit}>
        {currentTitle}
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default ColumnTitle;
