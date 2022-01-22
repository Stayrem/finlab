/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCheckUser, fetchLogin } from '../../api/api';
import { LoadingStatus } from '../../app/enums';

interface IUserStatus {
  loginStatus: LoadingStatus;
  userName: string | null;
}

export interface IUserRequest {
  username: string,
  password: string,
}

const initialState: IUserStatus = {
  loginStatus: LoadingStatus.PENDING,
  userName: null,
};

export const getToken = createAsyncThunk(
  'fetchToken',
  async (userData: FormData) => fetchLogin(userData),
);

export const getUser = createAsyncThunk(
  'getUser',
  async () => fetchCheckUser(),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state: IUserStatus) => {
      state.loginStatus = LoadingStatus.FULFILLED;
    });
    builder.addCase(getToken.rejected, (state: IUserStatus) => {
      state.loginStatus = LoadingStatus.FAILED;
    });
    builder.addCase(getToken.pending, (state: IUserStatus) => {
      state.loginStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getUser.fulfilled, (state: IUserStatus, action) => {
      state.userName = action.payload.user;
      state.loginStatus = LoadingStatus.FULFILLED;
    });
    builder.addCase(getUser.rejected, (state: IUserStatus) => {
      state.loginStatus = LoadingStatus.NONE;
    });
  },
});

export default userSlice.reducer;
