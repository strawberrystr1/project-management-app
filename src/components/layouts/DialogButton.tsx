import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  btn: (h: () => void, t?: string) => JSX.Element;
  form: (h: () => void) => JSX.Element;
  type: string;
};

const DialogButton = ({ form, type, btn }: Props) => {
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

DialogButton.defaultProps = {};

export default DialogButton;
