/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from '../../api/api';
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
  loginStatus: LoadingStatus.NONE,
  userName: null,
};

export const getToken = createAsyncThunk(
  'fetchToken',
  async (userData: FormData) => fetchLogin(userData),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state: IUserStatus) => {
      state.loginStatus = LoadingStatus.FULLFIELD;
    });
    builder.addCase(getToken.rejected, (state: IUserStatus) => {
      state.loginStatus = LoadingStatus.FAILD;
    });
    builder.addCase(getToken.pending, (state: IUserStatus) => {
      state.loginStatus = LoadingStatus.PENDING;
    });
  },
});

export default userSlice.reducer;
