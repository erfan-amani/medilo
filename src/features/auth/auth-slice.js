import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signinWithGoogle } from '../../firebase';

// redux thunk action creator
export const authWithGoogle = createAsyncThunk(
  'auth/signinWithGoogle',
  async () => {
    await signinWithGoogle();
  }
);

// create slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: {}, status: 'idle', error: null },
  reducers: {
    userSignedin: (state, action) => {
      state.user = action.payload;
    },
    userSignedout: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    // when authenticaion failed
    builder.addCase(authWithGoogle.rejected, (state, action) => {
      console.log('request rejected!');
      state.error = action.error.message;
      state.status = 'rejected';
    });
  },
});

// export reducer
export default authSlice.reducer;

// export actions from reducer
export const { userSignedin, userSignedout, authFailed } = authSlice.actions;
