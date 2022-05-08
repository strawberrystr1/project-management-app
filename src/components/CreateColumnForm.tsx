import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import DialogControls from './layouts/DialogControls';

const CreateColumnForm = ({ handleClose }: { handleClose: () => void }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      columnName: '',
    },
    onSubmit: (values) => {
      const order = Number.MAX_VALUE;
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
        id="columnName"
        name="columnName"
        label={t('forms.new_column.label')}
        variant="standard"
        value={formik.values.columnName}
        size="small"
        onChange={formik.handleChange}
        error={formik.touched.columnName && Boolean(formik.errors.columnName)}
        helperText={formik.touched.columnName && formik.errors.columnName}
      />
      <DialogControls onCancel={handleClose} />
    </form>
  );
};

export default CreateColumnForm;
