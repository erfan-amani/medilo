import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  signinWithGithub,
  signinWithGoogle,
  signinWithTwitter,
  signoutRequest,
} from '../../firebase';

// redux thunk action creator
export const authWithGoogle = createAsyncThunk(
  'auth/signinWithGoogle',
  async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }
);

export const authWithTwitter = createAsyncThunk(
  'auth/signinWithTwitter',
  async () => {
    try {
      await signinWithTwitter();
    } catch (error) {
      console.log(error);
    }
  }
);

export const authWithGithub = createAsyncThunk(
  'auth/signinwithGithub',
  async () => {
    try {
      await signinWithGithub();
    } catch (error) {
      console.log(error);
    }
  }
);

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
  },
  extraReducers: {
    // google
    [authWithGoogle.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    },
    [authWithGoogle.fulfilled]: (state) => {
      state.error = null;
      state.status = 'fulfilled';
    },
    [authWithGoogle.pending]: (state) => {
      state.error = null;
      state.status = 'pending';
    },

    // twitter
    [authWithTwitter.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    },
    [authWithTwitter.fulfilled]: (state) => {
      state.error = null;
      state.status = 'fulfilled';
    },
    [authWithTwitter.pending]: (state) => {
      state.error = null;
      state.status = 'pending';
    },

    // github
    [authWithGithub.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    },
    [authWithGithub.fulfilled]: (state) => {
      state.error = null;
      state.status = 'fulfilled';
    },
    [authWithGithub.pending]: (state) => {
      state.error = null;
      state.status = 'pending';
    },
  },
});

// export reducer
export default authSlice.reducer;

// export actions from reducer
export const { userSignedin, userNotFound, authFailed } = authSlice.actions;
