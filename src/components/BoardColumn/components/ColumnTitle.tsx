import { IconButton, Typography } from '@mui/material';
import DialogButton from '../../layouts/DialogButton';
import DialogControls from '../../layouts/DialogControls';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

type Props = {
  currentTitle: string;
  toggleEdit: () => void;
};

const ColumnTitle = ({ currentTitle, toggleEdit }: Props) => {
  return (
    <>
      <Typography variant="h6" onClick={toggleEdit}>
        {currentTitle}
      </Typography>
      <DialogButton
        type="delete_column"
        btn={(handleOpenDialog) => (
          <IconButton
            onClick={handleOpenDialog}
            size="small"
            color="secondary"
            aria-label="delete column"
          >
            <BackspaceOutlinedIcon />
          </IconButton>
        )}
        form={(handleCloseDialog) => <DialogControls onCancel={handleCloseDialog} />}
      />
    </>
  );
};

export default ColumnTitle;
