import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogButton from '../layouts/DialogButton';
import { IBoard } from '../../interfaces/apiInterfaces';
import { getSubstring } from '../../utils/functions';
import { useTranslation } from 'react-i18next';
import { useDeleteBoardMutation } from '../../store/services/boardsService';
import DialogControls from '../layouts/DialogControls';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useTypedDispatch } from '../../hooks/redux';
import { openSuccessSnack } from '../../store/reducers/snackSlice';

const DeleteBoardBtn = ({ board }: { board: IBoard }) => {
  const { t } = useTranslation();
  const [deleteBoard, { isError, error }] = useDeleteBoardMutation();
  const dispatch = useTypedDispatch();

  useErrorHandler(isError, error);

  const handleDeleteBoard = async (id: string) => {
    await deleteBoard(id).unwrap();
    dispatch(openSuccessSnack(t('snack_message.delete_board')));
  };

  return (
    <DialogButton
      type="delete_board"
      message={t(`forms.delete_board.description`, {
        title: getSubstring(board.title),
      })}
      btn={(handleOpen) => (
        <IconButton
          sx={{ position: 'absolute', right: 0, top: 0, transform: 'translate(0,100%)' }}
          aria-label="delete"
          color="warning"
          onClick={handleOpen}
        >
          <DeleteIcon />
        </IconButton>
      )}
      form={(handleClose) => (
        <DialogControls
          onConfirm={() => {
            handleDeleteBoard(board['_id']);
            handleClose();
          }}
          onCancel={handleClose}
        />
      )}
    />
  );
};

export default DeleteBoardBtn;
