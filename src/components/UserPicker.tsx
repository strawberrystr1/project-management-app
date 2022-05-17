import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetUsersQuery } from '../store/services/userService';
import { LinearProgress } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 272,
    },
  },
};

type Props = {
  users: string[];
  setUsers: (pickedUsers: string[]) => void;
};

const UserPicker = ({ users, setUsers }: Props) => {
  const { data = [], isLoading } = useGetUsersQuery();
  const handleChange = ({ target: { value } }: SelectChangeEvent<typeof users>) => {
    setUsers(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <Box mt={1} mb={1}>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <FormControl sx={{ mt: 1, mb: 1, width: 320 }}>
          <InputLabel htmlFor="users-picker-label">Users</InputLabel>
          <Select
            labelId="users-picker-label"
            id="users-picker"
            multiple
            variant="standard"
            value={users}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={data.find(({ _id }) => _id === value)?.name} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {data.map(({ _id, name }) => (
              <MenuItem key={_id + name} value={_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default UserPicker;
