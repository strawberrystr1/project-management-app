import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateBoardMutation } from '../store/services/boardsService';
import DialogControls from './layouts/DialogControls';

const CreateBoardForm = ({ handleClose }: { handleClose: () => void }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [createBoard] = useCreateBoardMutation();

  const formik = useFormik({
    initialValues: {
      boardName: '',
    },
    onSubmit: async (values) => {
      if (values.boardName.trim().length === 0) return;
      const token = localStorage.getItem('token-rss') as string;
      handleClose();
      navigate('/boards');
      await createBoard({
        token,
        title: values.boardName,
      }).unwrap();
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

export default CreateBoardForm;
