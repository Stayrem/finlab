/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../app/enums';
import { fetchTransactions, fetchAddTransaction } from '../../api/api';

export interface ITransactionItem {
  name: string;
  value: number;
  category: string;
  tags: string[];
}

interface IAddTransaction {
  name: string;
  value: number;
  category: string;
  tags?: string[];
}

interface ITransactions {
  data: Array<ITransactionItem>;
  status: LoadingStatus;
  addStatus: LoadingStatus;
}

const initialState: ITransactions = {
  data: [],
  status: LoadingStatus.NONE,
  addStatus: LoadingStatus.NONE,
};

export const getTransactions = createAsyncThunk(
  'fetchTransactions',
  async () => fetchTransactions(),
);

export const addTransaction = createAsyncThunk(
  'addTransaction',
  (transaction: IAddTransaction) => fetchAddTransaction(transaction),
);

const transactionsSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    resetAddStatus(state: ITransactions) {
      state.addStatus = LoadingStatus.NONE;
    },
  },
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
    builder.addCase(addTransaction.pending, (state: ITransactions) => {
      state.addStatus = LoadingStatus.PENDING;
    });
    builder.addCase(addTransaction.fulfilled, (state: ITransactions) => {
      state.addStatus = LoadingStatus.FULFILLED;
    });
    builder.addCase(addTransaction.rejected, (state: ITransactions) => {
      state.addStatus = LoadingStatus.FAILED;
    });
  },
});
export const { resetAddStatus } = transactionsSlice.actions;

export default transactionsSlice.reducer;
