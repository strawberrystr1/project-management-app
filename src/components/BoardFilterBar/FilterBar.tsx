/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  withStyles,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setColorSearch, setTaskSearch, setUsersSearch } from '../../store/reducers/boardSlice';
import UserPicker from '../UserPicker';
import { colors } from '../../utils/constants/colors';
import { addThemeScroll } from '../../utils/functions';

const FilterBar = () => {
  const { taskSearch, usersSearch, colorSearch } = useTypedSelector((state) => state.board);
  const dispatch = useTypedDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('value', value);
    dispatch(setTaskSearch(value));
  };

  const setUsersCallback = (pickedUsers: string[]) => {
    console.log('pickedUsers', pickedUsers);
    dispatch(setUsersSearch(pickedUsers));
  };

  const handleChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    console.log('value', value);
    dispatch(setColorSearch(value));
  };

  return (
    <Stack minHeight={95} direction="row" justifyContent="flex-start" alignItems="center" gap={2}>
      <Box position="relative">
        <TextField
          value={taskSearch}
          onChange={handleInputChange}
          label="Filter by title"
          variant="outlined"
        />
      </Box>
      <Box sx={{ width: 300, m: 0 }}>
        <UserPicker users={usersSearch} setUsers={setUsersCallback} message="Filter by members" />
      </Box>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="color-select-helper-label">Color</InputLabel>
        <Select
          labelId="color-select-helper-label"
          id="color-select-helper"
          value={colorSearch}
          sx={{ backgroundColor: colorSearch }}
          label="Color"
          onChange={handleChange}
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
    </Stack>
  );
};

export default FilterBar;
