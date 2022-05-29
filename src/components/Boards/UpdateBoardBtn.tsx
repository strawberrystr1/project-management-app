import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DialogButton from '../layouts/DialogButton';
import UpdateBoardForm from '../UpdateBoardForm';
import { IBoard } from '../../interfaces/apiInterfaces';

const UpdateBoardBtn = ({ board }: { board: IBoard }) => {
  return (
    <DialogButton
      type="update_board"
      btn={(handleOpen) => (
        <IconButton
          sx={{ position: 'absolute', right: 0, top: 0 }}
          aria-label="update"
          color="info"
          onClick={handleOpen}
        >
          <EditIcon />
        </IconButton>
      )}
      form={(handleClose) => <UpdateBoardForm board={board} handleClose={handleClose} />}
    />
  );
};

export default UpdateBoardBtn;
