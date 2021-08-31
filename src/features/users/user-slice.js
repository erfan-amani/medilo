import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    error: null,
    list: [],
  },
  reducers: {
    startedFetchingUsers: (state) => {
      state.status = 'pending';
    },
    completedFetchingUsers: (state, action) => {
      state.status = 'completed';
      state.error = [];
      state.list = action.payload;
    },
    failedFetchingUsers: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  startedFetchingUsers,
  completedFetchingUsers,
  failedFetchingUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
