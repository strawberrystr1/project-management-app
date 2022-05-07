import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  form: (h: () => void) => JSX.Element; // form component
  type: string; //translation type
};

const DialogButton = ({ form, type }: Props) => {
  const { t } = useTranslation();
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
        {t(`buttons.${type}`)}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t(`forms.${type}.title`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t(`forms.${type}.description`)}</DialogContentText>
          {form(handleClose)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogButton;
