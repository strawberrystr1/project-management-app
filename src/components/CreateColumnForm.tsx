import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import DialogControls from './layouts/DialogControls';

type Props = {
  handleClose: () => void;
  addColumn: (title: string) => void;
};

const CreateColumnForm = ({ handleClose, addColumn }: Props) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      columnName: '',
    },
    onSubmit: ({ columnName }) => {
      addColumn(columnName);
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
