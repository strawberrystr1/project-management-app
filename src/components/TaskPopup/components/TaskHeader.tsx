import { DialogTitle, DialogContentText, DialogContent, Avatar } from '@mui/material';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/redux';
import { useGetColumnByIdQuery } from '../../../store/services/columnsService';
import { useGetUserMutation } from '../../../store/services/userService';
import { stringAvatar } from '../../../utils/functions';

const TaskHeader: React.FC<{ title: string; column: string; user: string; board: string }> = ({
  title,
  board,
  column,
}) => {
  const { data: columnData } = useGetColumnByIdQuery({ id: board, columnId: column });
  const [getUser, { data }] = useGetUserMutation();
  const { userId } = useTypedSelector((state) => state.user);

  const fetchUser = async () => {
    await getUser(userId);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DialogContent sx={{ padding: '0' }}>
      <DialogTitle sx={{ padding: '0', fontSize: '24px' }}>{title}</DialogTitle>
      {columnData && <DialogContentText>in the column - {columnData.title}</DialogContentText>}
      <DialogContentText sx={{ paddingTop: '10px' }}>User asigned to this task:</DialogContentText>
      <Avatar
        sx={{
          width: 30,
          height: 30,
          fontSize: '1em',
        }}
      >
        {data && stringAvatar(data.name)}
      </Avatar>
    </DialogContent>
  );
};

export default TaskHeader;
