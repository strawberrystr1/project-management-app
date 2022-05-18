import { Avatar, Tooltip } from '@mui/material';
import { stringAvatar } from '../../../utils/functions';

export const UserAvatar = ({ name }: { name: string }) => {
  return (
    <Tooltip title={name}>
      <Avatar
        sx={{
          width: 30,
          height: 30,
          fontSize: '1em',
          marginRight: '5px',
        }}
      >
        {stringAvatar(name)}
      </Avatar>
    </Tooltip>
  );
};
