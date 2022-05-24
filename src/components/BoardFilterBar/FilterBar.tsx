import { Input, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setTaskSearch, setUsersSearch } from '../../store/reducers/boardSlice';
import SearchIcon from '@mui/icons-material/Search';
import UserPicker from '../UserPicker';

const FilterBar = () => {
  const { taskSearch, usersSearch } = useTypedSelector((state) => state.board);
  const dispatch = useTypedDispatch();
  const [focused, setFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('value', value);
    dispatch(setTaskSearch(value));
  };

  const setUsersCallback = (pickedUsers: string[]) => {
    console.log('pickedUsers', pickedUsers);
    dispatch(setUsersSearch(pickedUsers));
  };

  return (
    <>
      <Stack
        minHeight={95}
        mt="10px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
      >
        <Box position="relative">
          <Input
            sx={{ paddingLeft: 4, fontSize: '1.2rem' }}
            // placeholder={t('boards.search_board')}
            placeholder="Search by title"
            value={taskSearch}
            onChange={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Box position="absolute" sx={{ left: 0, top: 8 }}>
            <SearchIcon fontSize="small" color={focused ? 'primary' : 'inherit'} />
          </Box>
        </Box>
        <Box sx={{ width: 300 }}>
          <UserPicker users={usersSearch} setUsers={setUsersCallback} />
        </Box>
      </Stack>
    </>
  );
};

export default FilterBar;
