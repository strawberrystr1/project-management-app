import { Alert, Snackbar } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { closeSnack } from '../store/reducers/snackSlice';

const SnackPopup = () => {
  const { isSnackBarOpen, severity, message } = useTypedSelector((state) => state.snack);
  const dispatch = useTypedDispatch();

  const handleClose = () => {
    setTimeout(() => {
      dispatch(closeSnack());
    }, 500);
  };

  return (
    <Snackbar open={isSnackBarOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackPopup;
