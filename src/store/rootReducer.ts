import { combineReducers } from '@reduxjs/toolkit';
import transactionsSlice from '../features/transactions/transactionsSlice';

const rootReducer = combineReducers({ transactions: transactionsSlice });

export default rootReducer;
