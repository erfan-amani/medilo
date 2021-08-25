import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    completedFetching: (state, action) => {
      console.log(action.payload);
      state.items = action.payload;
      state.error = null;
      state.status = 'completed';
    },
    startedFetching: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    failedFetching: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;

export const {
  addPost,
  failedFetching,
  startedFetching,
  completedFetching,
} = postsSlice.actions;
