import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import {
  clearFilters,
  setColorSearch,
  setTaskSearch,
  setUsersSearch,
} from '../../store/reducers/boardSlice';
import UserPicker from '../UserPicker';
import { colors } from '../../utils/constants/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const FilterBar = () => {
  const { taskSearch, usersSearch, colorSearch } = useTypedSelector((state) => state.board);
  const dispatch = useTypedDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setTaskSearch(value));
  };

  const setUsersCallback = (pickedUsers: string[]) => {
    dispatch(setUsersSearch(pickedUsers));
  };

  const handleChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch(setColorSearch(value));
  };

  const clearHandle = () => {
    dispatch(clearFilters());
  };

  return (
    <>
      <Box position="relative" sx={{ width: 300, m: 0 }}>
        <TextField
          fullWidth
          value={taskSearch}
          onChange={handleInputChange}
          label="Filter by title"
          variant="outlined"
        />
      </Box>
      <Box sx={{ width: 300, m: 0 }}>
        <UserPicker users={usersSearch} setUsers={setUsersCallback} message="Filter by members" />
      </Box>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="color-select-helper-label">Color</InputLabel>
        <Select
          labelId="color-select-helper-label"
          id="color-select-helper"
          value={colorSearch}
          label="Color"
          onChange={handleChange}
          renderValue={(_) => (
            <Box
              sx={{
                width: '100%',
                height: 20,
                backgroundColor: colorSearch,
              }}
            ></Box>
          )}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {colors.map((color) => (
            <MenuItem
              key={color}
              value={color}
              sx={{
                backgroundColor: color,
                height: '36px',
                '&:hover': { backgroundColor: color, opacity: 0.8 },
              }}
            ></MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={clearHandle}
        variant="contained"
        color="warning"
        endIcon={<HighlightOffIcon />}
        sx={{ mt: { xs: 2, md: 0 } }}
      >
        Clear
      </Button>
    </>
  );
};

export default FilterBar;
