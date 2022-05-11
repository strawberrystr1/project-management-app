import { IconButton, Input } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRef } from 'react';
import { useUpdateColumnMutation } from '../../../store/services/columnsService';

type Props = {
  currentTitle: string;
  toggleEdit: () => void;
  boardId: string;
  columnId: string;
  order: number;
};

const ChangeColumnTitle = ({ currentTitle, toggleEdit, boardId, columnId, order }: Props) => {
  const textarea = useRef<HTMLInputElement>();
  const [updateColumn] = useUpdateColumnMutation();
  const OnConfirm = () => {
    textarea.current &&
      updateColumn({
        paths: { boardId, columnId },
        body: { order, title: textarea.current.value },
      });
    toggleEdit();
  };
  return (
    <>
      <Input autoFocus defaultValue={currentTitle} inputRef={textarea} />
      <IconButton onClick={OnConfirm} size="small" color="success" aria-label="delete column">
        <CheckCircleOutlineIcon />
      </IconButton>
      <IconButton onClick={toggleEdit} size="small" color="error" aria-label="delete column">
        <HighlightOffIcon />
      </IconButton>
    </>
  );
};

export default ChangeColumnTitle;
