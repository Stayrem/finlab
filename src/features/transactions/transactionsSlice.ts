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
  timestamp: number;
  tags?: string[];
}

interface ITransactionsState {
  data: Array<ITransactionItem>;
  currentPage: number;
  totalTransactions: number;
  status: LoadingStatus;
  addStatus: LoadingStatus;
}

const initialState: ITransactionsState = {
  data: [],
  currentPage: 1,
  totalTransactions: 1,
  status: LoadingStatus.NONE,
  addStatus: LoadingStatus.NONE,
};

export const getTransactions = createAsyncThunk(
  'fetchTransactions',
  async (page: number) => fetchTransactions(page),
);

export const addTransaction = createAsyncThunk(
  'addTransaction',
  (transaction: IAddTransaction) => fetchAddTransaction(transaction),
);

const transactionsSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    resetAddStatus(state: ITransactionsState) {
      state.addStatus = LoadingStatus.NONE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state: ITransactionsState, action) => {
      state.data = action.payload.transactions;
      state.currentPage = action.payload.current;
      state.totalTransactions = action.payload.total;
      state.status = LoadingStatus.FULFILLED;
    });
    builder.addCase(getTransactions.pending, (state: ITransactionsState) => {
      state.status = LoadingStatus.PENDING;
    });
    builder.addCase(getTransactions.rejected, (state: ITransactionsState) => {
      state.status = LoadingStatus.FAILED;
    });
    builder.addCase(addTransaction.pending, (state: ITransactionsState) => {
      state.addStatus = LoadingStatus.PENDING;
    });
    builder.addCase(addTransaction.fulfilled, (state: ITransactionsState) => {
      state.addStatus = LoadingStatus.FULFILLED;
    });
    builder.addCase(addTransaction.rejected, (state: ITransactionsState) => {
      state.addStatus = LoadingStatus.FAILED;
    });
  },
});
export const { resetAddStatus } = transactionsSlice.actions;

export default transactionsSlice.reducer;
