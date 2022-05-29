import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from '../hooks/redux';
import { CreateTask, IInitialFormValues } from '../interfaces/formInterfaces';
import { openErrorSnack } from '../store/reducers/snackSlice';
import { taskFields } from '../utils/constants/formFields';
import DialogControls from './layouts/DialogControls';
import UserPicker from './UserPicker';

type Props = {
  handleClose: () => void;
  addTask: ({ title, description, users }: CreateTask) => void;
};

const CreateTaskForm = ({ handleClose, addTask }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const initialValues = taskFields.reduce<IInitialFormValues>((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  const [users, setUsers] = useState<string[]>([]);
  const setUsersCallback = (pickedUsers: string[]) => setUsers(pickedUsers);

  const formik = useFormik({
    initialValues,
    onSubmit: ({ taskTitle, taskDescription }) => {
      const title = taskTitle.trim();
      const description = taskDescription.trim();
      if (!title || !description) dispatch(openErrorSnack(t('snack_message.task.required_fields')));
      else {
        addTask({ title, description, users });
        handleClose();
      }
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
      <UserPicker users={users} setUsers={setUsersCallback} />
      <DialogControls onCancel={handleClose} />
    </form>
  );
};

export default CreateTaskForm;
