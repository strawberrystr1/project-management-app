import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  Box,
  Input,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetUsersQuery } from '../../../store/services/userService';
import { UserAvatar } from './UserAvatar';
import styles from '../style.module.scss';
import { useTranslation } from 'react-i18next';
import { IUpdateTaskFromPopup, User } from '../../../interfaces/apiInterfaces';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useErrorHandler } from '../../../hooks/useErrorHandler';

type Props = {
  title: string;
  users: string[];
  columnTitle: string;
  userId: string;
  handleChange: (newData: IUpdateTaskFromPopup) => void;
  color: string;
};

const TaskHeader = ({ title, users, columnTitle, userId, handleChange, color }: Props) => {
  const [userOwner, setUserOwner] = useState('');
  const [input, setInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [usersData, setUsersData] = useState<string[][]>([]);
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersQuery();

  useEffect(() => {
    if (data) {
      const owner = data.find((item) => item._id === userId) as User;
      const asigned = data
        .filter((item) => users.includes(item._id))
        .map((item) => [item.name, item._id]);
      setUserOwner(owner.name);
      setUsersData(asigned);
    }
  }, [isLoading, users]);

  const handleConfirm = () => {
    if (inputValue.trim().length) {
      if (color) {
        handleChange({ title: `${inputValue} <!> ${color}` });
      } else {
        handleChange({ title: inputValue });
      }
    }
    setInput(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
  const removeUser = (name: string) => {
    const updatedUsers = usersData.filter((item) => item[0] !== name);
    setUsersData(updatedUsers);
    handleChange({ users: updatedUsers.map((item) => item[1]) });
  };

  return (
    <DialogContent sx={{ padding: '0' }}>
      {!input && (
        <DialogTitle
          onClick={() => {
            setInput(true);
            setInputValue(title.split(' <!> ')[0]);
          }}
          sx={{ padding: '0', fontSize: '24px', marginTop: '10px' }}
        >
          {title.split(' <!> ')[0]}
        </DialogTitle>
      )}
      {input && (
        <>
          <Input autoFocus value={inputValue} multiline onChange={handleInput} />
          <IconButton
            onClick={handleConfirm}
            size="small"
            color="success"
            aria-label="delete column"
          >
            <CheckCircleOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleConfirm} size="small" color="error" aria-label="delete column">
            <HighlightOffOutlinedIcon />
          </IconButton>
        </>
      )}
      <DialogContentText>
        {t('task_popup.column')} - {columnTitle}
      </DialogContentText>
      <Divider sx={{ marginTop: '10px' }} />
      <DialogContentText sx={{ paddingTop: '10px' }}>{t('task_popup.author')}</DialogContentText>
      {userOwner && <UserAvatar name={userOwner} />}
      <Divider sx={{ marginTop: '10px' }} />
      <DialogContentText sx={{ paddingTop: '10px' }}>{t('task_popup.users')}</DialogContentText>
      {usersData.length === 0 && <Typography>{t('task_popup.asigned')}</Typography>}
      {usersData.length > 0 && (
        <Box className={styles.users}>
          {usersData.map((item) => (
            <UserAvatar name={item[0]} key={item[0]} removeUser={removeUser} />
          ))}
        </Box>
      )}
    </DialogContent>
  );
};

export default TaskHeader;
