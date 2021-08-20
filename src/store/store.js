import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/auth-slice';
import postsReducer from '../features/posts/posts-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export default store;
