import DialogControls from './layouts/DialogControls';

const ConfirmForm = ({
  handleClose,
  handleConfirm,
}: {
  handleClose: () => void;
  handleConfirm: () => void;
}) => {
  return <DialogControls onConfirm={handleConfirm} onCancel={handleClose} />;
};

export default ConfirmForm;
