import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const CreateBoard = () => {
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Board
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('forms.new_board.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('forms.new_board.description')}</DialogContentText>
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
              onChange={formik.handleChange}
              error={formik.touched.boardName && Boolean(formik.errors.boardName)}
              helperText={formik.touched.boardName && formik.errors.boardName}
            />
            <DialogActions>
              <Button onClick={handleClose} size="small" variant="contained" color="secondary">
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" size="small" variant="contained">
                {t('buttons.submit')}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateBoard;
