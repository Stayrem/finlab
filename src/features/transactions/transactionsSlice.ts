/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../app/enums';
import { fetchTransactions } from '../../api/api';

export interface ITransactionItem {
  transactionType: string;
  value: number;
  category: string;
  tags: string[];
}

interface ITransactions {
  data: Array<ITransactionItem>;
  status: LoadingStatus;
}

const initialState: ITransactions = {
  data: [],
  status: LoadingStatus.NONE,
};

export const getTransactions = createAsyncThunk(
  'fetchTransactions',
  async () => fetchTransactions(),
);

const transactionsSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state: ITransactions, action) => {
      state.data = action.payload;
      state.status = LoadingStatus.FULFILLED;
    });
    builder.addCase(getTransactions.pending, (state: ITransactions) => {
      state.status = LoadingStatus.PENDING;
    });
    builder.addCase(getTransactions.rejected, (state: ITransactions) => {
      state.status = LoadingStatus.FAILED;
    });
  },
});

export default transactionsSlice.reducer;
