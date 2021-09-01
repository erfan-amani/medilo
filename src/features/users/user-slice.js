import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase';

export const updateUsername = createAsyncThunk(
  'users/updateUsername',
  async (newUsername, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      await db
        .collection('users')
        .doc(currentUser.uid)
        .update({ userName: newUsername });
      await currentUser.updateProfile({ displayName: newUsername });
      console.log(currentUser.displayName);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    error: null,
    list: [],
  },
  reducers: {
    startedFetchingUsers: (state) => {
      state.status = 'pending';
    },
    completedFetchingUsers: (state, action) => {
      state.status = 'completed';
      state.error = [];
      state.list = action.payload;
    },
    failedFetchingUsers: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  startedFetchingUsers,
  completedFetchingUsers,
  failedFetchingUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
