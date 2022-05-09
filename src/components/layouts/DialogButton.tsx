import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDialogButtonProps } from '../../interfaces/formInterfaces';

const DialogButton = ({ form, type, btn }: IDialogButtonProps) => {
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
      {btn(handleClickOpen, type)}
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
