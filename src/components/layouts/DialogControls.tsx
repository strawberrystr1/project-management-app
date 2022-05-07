import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useTranslation } from 'react-i18next';

type Props = {
  confirmBtnName: string;
  cancelBtnName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DialogControls = ({ cancelBtnName, onCancel, confirmBtnName, onConfirm }: Props) => {
  const { t } = useTranslation();

  return (
    <DialogActions>
      <Button
        onClick={onCancel}
        size="small"
        variant="contained"
        color="secondary"
        className={cancelBtnName}
      >
        {t('buttons.cancel')}
      </Button>
      <Button
        onClick={onConfirm}
        type="submit"
        size="small"
        variant="contained"
        className={confirmBtnName}
      >
        {t('buttons.submit')}
      </Button>
    </DialogActions>
  );
};

DialogControls.defaultProps = {
  confirmBtnName: 'confirm-button',
  cancelBtnName: 'cancel-button',
  onConfirm: null,
  onCancel: null,
};

export default DialogControls;
