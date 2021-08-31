import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/auth-slice';
import postsReducer from '../features/posts/posts-slice';
import usersReducer from '../features/users/user-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

export default store;
