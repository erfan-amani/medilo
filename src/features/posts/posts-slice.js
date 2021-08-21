import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    userPosts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    completedFetching: {
      reducer: (state, action) => {
        const { items, userPosts } = action.payload;

        state.items = items;
        state.userPosts = userPosts;
        state.error = null;
        state.status = 'completed';
      },
      prepare: (data) => {
        const { items, userId } = data;
        let userPosts = [];

        if (userId) {
          userPosts = items.filter((post) => post.userId === userId);
        }

        return { payload: { items, userPosts } };
      },
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
