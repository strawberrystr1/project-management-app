import { DialogTitle, DialogContentText, DialogContent, Avatar } from '@mui/material';
import { useGetColumnByIdQuery } from '../../../store/services/columnsService';
import { stringAvatar } from '../../../utils/functions';

const TaskHeader: React.FC<{ title: string; column: string; user: string; board: string }> = ({
  title,
  board,
  column,
}) => {
  // const { data: columnData } = useGetColumnByIdQuery({ id: board, columnId: column });

  const user = {
    name: 'A S',
  };

  return (
    <DialogContent sx={{ padding: '0' }}>
      <DialogTitle sx={{ padding: '0', fontSize: '24px' }}>{title}</DialogTitle>
      {/* {columnData && <DialogContentText>in the column - {columnData.title}</DialogContentText>} */}
      <DialogContentText>in the column - Done</DialogContentText>
      <DialogContentText sx={{ paddingTop: '10px' }}>User asigned to this task:</DialogContentText>
      <Avatar
        sx={{
          width: 30,
          height: 30,
          fontSize: '1em',
        }}
      >
        {stringAvatar(user.name)}
      </Avatar>
    </DialogContent>
  );
};

export default TaskHeader;
