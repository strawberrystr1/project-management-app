import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  form: (h: () => void) => JSX.Element; // form component
  type: string; //translation type
  className: string;
};

const DialogButton = ({ form, type, className }: Props) => {
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
      <Button onClick={handleClickOpen} className={className}>
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
