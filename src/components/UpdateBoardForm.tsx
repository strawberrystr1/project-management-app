import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IBoard } from '../interfaces/apiInterfaces';
import { useCreateBoardMutation, useUpdateBoardMutation } from '../store/services/boardsService';
import DialogControls from './layouts/DialogControls';

const UpdateBoardForm = ({ handleClose, board }: { handleClose: () => void; board: IBoard }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [updateBoard] = useUpdateBoardMutation();

  const formik = useFormik({
    initialValues: {
      boardName: board.title,
    },
    onSubmit: async (values) => {
      const token = localStorage.getItem('token-rss') as string;
      await updateBoard({ id: board.id, token, title: values.boardName }).unwrap();

      handleClose();
      navigate('/boards');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        autoFocus
        autoComplete="off"
        fullWidth
        margin="dense"
        id="boardName"
        name="boardName"
        label={t('forms.new_board.label')}
        variant="standard"
        value={formik.values.boardName}
        size="small"
        onChange={formik.handleChange}
        error={formik.touched.boardName && Boolean(formik.errors.boardName)}
        helperText={formik.touched.boardName && formik.errors.boardName}
      />
      <DialogControls onCancel={handleClose} />
    </form>
  );
};

export default UpdateBoardForm;
