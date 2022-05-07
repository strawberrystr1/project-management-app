import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import DialogControls from './layouts/DialogControls';

const CreateBoardForm = ({ handleClose }: { handleClose: () => void }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      boardName: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleClose();
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
      <DialogControls handleClose={handleClose} />
    </form>
  );
};

export default CreateBoardForm;
