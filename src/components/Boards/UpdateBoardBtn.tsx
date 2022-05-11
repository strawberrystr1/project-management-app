import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DialogButton from '../layouts/DialogButton';
import UpdateBoardForm from '../UpdateBoardForm';
import { IBoard } from '../../interfaces/apiInterfaces';
import { getSubstring } from '../../utils/functions';
import { useTranslation } from 'react-i18next';

const UpdateBoardBtn = ({ board }: { board: IBoard }) => {
  const { t } = useTranslation();

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
