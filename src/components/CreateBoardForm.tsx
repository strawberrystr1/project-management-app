import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/redux';
import { useCreateBoardMutation } from '../store/services/boardsService';
import DialogControls from './layouts/DialogControls';

const CreateBoardForm = ({ handleClose }: { handleClose: () => void }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [createBoard, { isLoading }] = useCreateBoardMutation();
  const [isDisable, setIsDisable] = useState(false);
  const { userId } = useTypedSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      boardName: '',
    },
    onSubmit: async (values) => {
      if (values.boardName.trim().length === 0) return;
      setIsDisable(true);
      await createBoard({
        title: values.boardName,
        owner: userId,
        users: [],
      }).unwrap();
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
      <DialogControls disable={isDisable} loading={isLoading} onCancel={handleClose} />
    </form>
  );
};

export default CreateBoardForm;
