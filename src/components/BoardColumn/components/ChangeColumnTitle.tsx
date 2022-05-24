import { IconButton, Input } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRef } from 'react';
import { useUpdateColumnMutation } from '../../../store/services/columnsService';
import styles from './style.module.scss';
import { useTypedDispatch } from '../../../hooks/redux';
import { changeColumn } from '../../../store/reducers/boardSlice';
import { useTranslation } from 'react-i18next';
import { openSuccessSnack, openErrorSnack } from '../../../store/reducers/snackSlice';

type Props = {
  currentTitle: string;
  disactivateEdit: () => void;
  boardId: string;
  columnId: string;
  order: number;
};

const ChangeColumnTitle = ({ currentTitle, disactivateEdit, boardId, columnId, order }: Props) => {
  const { t } = useTranslation();
  const textarea = useRef<HTMLInputElement>();
  const dispatch = useTypedDispatch();
  const [updateColumn] = useUpdateColumnMutation();

  const onConfirm = () => {
    const trimmered = textarea.current ? textarea.current.value.trim() : '';
    const title = trimmered || currentTitle;
    const data = { columnId, body: { order, title, boardId } };
    dispatch(changeColumn(data));
    updateColumn(data)
      .unwrap()
      .catch((e) => e);
    disactivateEdit();
    trimmered
      ? dispatch(openSuccessSnack(t('snack_message.column.update.success')))
      : dispatch(openErrorSnack(t('snack_message.column.update.validation_error')));
  };

  return (
    <>
      <Input
        autoFocus
        defaultValue={currentTitle}
        multiline
        className={styles['column-title']}
        inputRef={textarea}
      />
      <IconButton onClick={onConfirm} size="small" color="success" aria-label="delete column">
        <CheckCircleOutlineIcon />
      </IconButton>
      <IconButton onClick={disactivateEdit} size="small" color="error" aria-label="delete column">
        <HighlightOffIcon />
      </IconButton>
    </>
  );
};

export default ChangeColumnTitle;
