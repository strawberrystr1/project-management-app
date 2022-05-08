import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { IInitialFormValues } from '../interfaces/formInterfaces';
import { taskFields } from '../utils/constants/formFields';
import DialogControls from './layouts/DialogControls';

const CreateTaskForm = ({ handleClose }: { handleClose: () => void }) => {
  const { t } = useTranslation();
  const initialValues = taskFields.reduce<IInitialFormValues>((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const order = Number.MAX_VALUE;
      alert(JSON.stringify(values, null, 2));
      handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {taskFields.map((field) => (
        <TextField
          key={field}
          autoFocus
          autoComplete="off"
          fullWidth
          margin="dense"
          id={field}
          name={field}
          label={t(`forms.new_task.${[field]}`)}
          variant="standard"
          value={formik.values[field]}
          size="small"
          onChange={formik.handleChange}
          error={formik.touched[field] && Boolean(formik.errors[field])}
          helperText={formik.touched[field] && formik.errors[field]}
        />
      ))}
      <DialogControls onCancel={handleClose} />
    </form>
  );
};

export default CreateTaskForm;
