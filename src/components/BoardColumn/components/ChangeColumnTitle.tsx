import { IconButton, TextField } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRef } from 'react';

type Props = {
  currentTitle: string;
  toggleEdit: () => void;
};

const ChangeColumnTitle = ({ currentTitle, toggleEdit }: Props) => {
  const textarea = useRef();
  return (
    <>
      <TextField
        id="outlined-basic"
        variant="outlined"
        autoFocus
        defaultValue={currentTitle}
        ref={textarea.current}
      />
      <IconButton size="small" color="success" aria-label="delete column">
        <CheckCircleOutlineIcon />
      </IconButton>
      <IconButton onClick={toggleEdit} size="small" color="error" aria-label="delete column">
        <HighlightOffIcon />
      </IconButton>
    </>
  );
};

export default ChangeColumnTitle;
