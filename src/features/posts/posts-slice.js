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
    completedFetchingPosts: (state, action) => {
      console.log(action.payload);
      state.items = action.payload;
      state.error = null;
      state.status = 'completed';
    },
    startedFetchingPosts: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    failedFetchingPosts: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;

export const {
  addPost,
  failedFetchingPosts,
  startedFetchingPosts,
  completedFetchingPosts,
} = postsSlice.actions;
