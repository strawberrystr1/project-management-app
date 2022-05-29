import { Avatar, Tooltip } from '@mui/material';
import { stringAvatar } from '../../../utils/functions';

type Props = { name: string; removeUser?: (name: string) => void };

export const UserAvatar = ({ name, removeUser }: Props) => {
  return (
    <Tooltip title={name}>
      <Avatar
        sx={{
          width: 30,
          height: 30,
          fontSize: '1em',
          marginRight: '5px',
          ':hover': { cursor: removeUser ? 'pointer' : 'initial' },
        }}
        onClick={() => removeUser && removeUser(name)}
      >
        {stringAvatar(name)}
      </Avatar>
    </Tooltip>
  );
};
