import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import transactionsSlice from '../features/transactions/transactionsSlice';

const rootReducer = combineReducers({ transactions: transactionsSlice, user: userReducer });

export default rootReducer;
