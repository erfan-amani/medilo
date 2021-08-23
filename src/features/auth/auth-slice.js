import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { auth } from '../../firebase';

export const signout = createAsyncThunk(
  'auth/signout',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSignedin = createAsyncThunk(
  'auth/signin',
  async (provider, { rejectWithValue }) => {
    try {
      const response = await auth.signInWithPopup(provider);
      console.log(response);
      // return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// create slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    userFound: (state, action) => {
      state.user = action.payload;
      state.status = 'succeed';
    },
    userNotFound: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [userSignedin.pending]: (state) => {
      state.status = 'pending';
    },
    [userSignedin.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.error = null;
    },
    [userSignedin.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// export reducer
export default authSlice.reducer;

// export actions from reducer
export const { userFound, userNotFound } = authSlice.actions;
