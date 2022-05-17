import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IInitialFormValues } from '../interfaces/formInterfaces';
import { taskFields } from '../utils/constants/formFields';
import DialogControls from './layouts/DialogControls';
import UserPicker from './UserPicker';

type Props = {
  handleClose: () => void;
  addTask: ({ title, description }: IInitialFormValues) => void;
};

const CreateTaskForm = ({ handleClose, addTask }: Props) => {
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
      addTask({ title: taskTitle, description: taskDescription });
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
      <UserPicker users={users} setUsers={setUsersCallback} />
      <DialogControls onCancel={handleClose} />
    </form>
  );
};

export default CreateTaskForm;
