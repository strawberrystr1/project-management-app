import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetUsersQuery } from '../store/services/userService';
import { LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  message?: string;
};

const UserPicker = ({ users, setUsers, message }: Props) => {
  const { t } = useTranslation();
  const { data = [], isLoading } = useGetUsersQuery();
  const handleChange = ({ target: { value } }: SelectChangeEvent<typeof users>) => {
    setUsers(typeof value === 'string' ? value.split(',') : value);
  };

  const labelMessage = message ? message : t('forms.new_task.users');

  return (
    <Box mt={1} mb={1}>
      <FormControl sx={{ mt: 1, mb: 1, width: '100%' }}>
        <InputLabel htmlFor="users-picker-label">{labelMessage}</InputLabel>
        <Select
          labelId="users-picker-label"
          id="users-picker"
          multiple
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
          {isLoading ? (
            <LinearProgress color="secondary" />
          ) : (
            data.map(({ _id, name }) => (
              <MenuItem key={_id + name} value={_id}>
                {name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserPicker;
