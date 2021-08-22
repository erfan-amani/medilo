import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signoutRequest } from '../../firebase';

export const signout = createAsyncThunk('auth/signout', async () => {
  await signoutRequest();
});

// create slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    userSignedin: (state, action) => {
      state.user = action.payload;
    },
    userNotFound: (state) => {
      state.user = null;
    },
    siginStarted: (state) => {
      state.status = ' pending';
      state.error = null;
    },
    siginFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    siginSucceed: (state) => {
      state.status = 'succeed';
      state.error = null;
    },
  },
});

// export reducer
export default authSlice.reducer;

// export actions from reducer
export const {
  userSignedin,
  userNotFound,
  siginStarted,
  siginFailed,
  siginSucceed,
} = authSlice.actions;
