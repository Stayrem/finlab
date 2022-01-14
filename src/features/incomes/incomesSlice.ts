import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../app/enums';
import { fetchIncomes } from '../../api/api';

export type IncomeItemType = {
  name: string;
  sum: number;
}

type IncomesType = {
  incomes: Array<IncomeItemType>;
  incomesFetchStatus: LoadingStatus;
}

const initialState: IncomesType = {
  incomes: [],
  incomesFetchStatus: LoadingStatus.NONE,
};

export const getIncomes = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const response = await fetchIncomes();
    return response.data;
  },
);

const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIncomes.fulfilled, (state: IncomesType, action) => {
      state.incomes = action.payload;
      state.incomesFetchStatus = LoadingStatus.FULLFIELD;
    });
    builder.addCase(getIncomes.pending, (state: IncomesType) => {
      state.incomesFetchStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getIncomes.rejected, (state: IncomesType) => {
      state.incomesFetchStatus = LoadingStatus.FAILD;
    });
  },
});

export default incomesSlice.reducer;
