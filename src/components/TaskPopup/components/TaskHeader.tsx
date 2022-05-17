import { DialogTitle, DialogContentText, DialogContent, Avatar, Box } from '@mui/material';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/redux';
import { useGetUserMutation } from '../../../store/services/userService';
import { UserAvatar } from './UserAvatar';
import styles from '../style.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  users: string[];
  columnTitle: string;
  userId: string;
};

const TaskHeader = ({ title, users, columnTitle, userId }: Props) => {
  const [getUser, { data }] = useGetUserMutation();
  const fakeUsers = ['Ans', 'fdsf sdf']; // change for real users
  const { t } = useTranslation();
  const fetchUser = async () => {
    await getUser(userId);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DialogContent sx={{ padding: '0' }}>
      <DialogTitle sx={{ padding: '0', fontSize: '24px' }}>{title}</DialogTitle>
      <DialogContentText>
        {t('task_popup.column')} - {columnTitle}
      </DialogContentText>
      <DialogContentText sx={{ paddingTop: '10px' }}>{t('task_popup.author')}</DialogContentText>
      {data && <UserAvatar name={data.name} />}
      <DialogContentText sx={{ paddingTop: '10px' }}>{t('task_popup.users')}</DialogContentText>
      <Box className={styles.users}>
        {fakeUsers.map((item) => (
          <UserAvatar name={item} key={item} />
        ))}
      </Box>
    </DialogContent>
  );
};

export default TaskHeader;
