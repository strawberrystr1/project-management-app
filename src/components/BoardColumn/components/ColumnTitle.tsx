import { IconButton, Typography } from '@mui/material';
import DialogButton from '../../layouts/DialogButton';
import DialogControls from '../../layouts/DialogControls';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { useDeleteColumnMutation } from '../../../store/services/columnsService';

type Props = {
  currentTitle: string;
  toggleEdit: () => void;
  boardId: string;
  columnId: string;
};

const ColumnTitle = ({ currentTitle, toggleEdit, boardId, columnId }: Props) => {
  const [deleteColumn] = useDeleteColumnMutation();
  const deleteColumnCallback = () => deleteColumn({ boardId, columnId });

  return (
    <>
      <Typography variant="h6" onClick={toggleEdit}>
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
