import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAddColumnMutation } from '../store/services/columnsService';
import DialogControls from './layouts/DialogControls';

type Props = {
  handleClose: () => void;
  order: number;
  boardId?: string;
};

const CreateColumnForm = ({ handleClose, order, boardId }: Props) => {
  const { t } = useTranslation();
  const [addColumn] = useAddColumnMutation();
  const formik = useFormik({
    initialValues: {
      columnName: '',
    },
    onSubmit: ({ columnName }) => {
      boardId && addColumn({ order, title: columnName, id: boardId });
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
