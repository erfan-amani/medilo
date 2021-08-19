import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signinWithGoogle, signinWithTwitter } from '../../firebase';

// redux thunk action creator
export const authWithGoogle = createAsyncThunk(
  'auth/signinWithGoogle',
  async () => {
    await signinWithGoogle();
  }
);

export const authWithTwitter = createAsyncThunk(
  'auth/signinWithTwitter',
  async () => {
    await signinWithTwitter();
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
      state.error = action.error.message;
      state.status = 'rejected';
    });
    builder.addCase(authWithGoogle.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(authWithTwitter.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    });
    builder.addCase(authWithTwitter.fulfilled, (state) => {
      state.error = null;
    });
  },
});

// export reducer
export default authSlice.reducer;

// export actions from reducer
export const { userSignedin, userSignedout, authFailed } = authSlice.actions;
