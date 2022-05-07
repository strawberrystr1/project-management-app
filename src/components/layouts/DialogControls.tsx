import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useTranslation } from 'react-i18next';

const DialogControls = ({ handleClose }: { handleClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <DialogActions>
      <Button onClick={handleClose} size="small" variant="contained" color="secondary">
        {t('buttons.cancel')}
      </Button>
      <Button type="submit" size="small" variant="contained">
        {t('buttons.submit')}
      </Button>
    </DialogActions>
  );
};

export default DialogControls;
