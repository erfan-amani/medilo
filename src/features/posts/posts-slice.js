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
    updatePosts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default postsSlice.reducer;

export const { addPost, updatePosts } = postsSlice.actions;
