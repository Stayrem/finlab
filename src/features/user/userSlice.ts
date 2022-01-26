/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddUser, fetchCheckUser, fetchLogin } from '../../api/api';
import { LoadingStatus } from '../../app/enums';

interface IUserStatus {
  loginStatus: LoadingStatus;
  registrationStatus: LoadingStatus;
  userName: string | null;
}

export interface IUserRequest {
  username: string,
  password: string,
}

const initialState: IUserStatus = {
  loginStatus: LoadingStatus.PENDING,
  registrationStatus: LoadingStatus.NONE,
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

export const addUser = createAsyncThunk(
  'addUser',
  async () => fetchAddUser(),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRegistrationStateToDefault(state: IUserStatus) {
      state.registrationStatus = LoadingStatus.NONE;
    },
  },
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
    builder.addCase(addUser.pending, (state: IUserStatus) => {
      state.registrationStatus = LoadingStatus.PENDING;
    });
    builder.addCase(addUser.fulfilled, (state: IUserStatus) => {
      state.registrationStatus = LoadingStatus.FULFILLED;
    });
    builder.addCase(addUser.rejected, (state: IUserStatus) => {
      state.registrationStatus = LoadingStatus.FAILED;
    });
  },
});
export const { setRegistrationStateToDefault } = userSlice.actions;

export default userSlice.reducer;
