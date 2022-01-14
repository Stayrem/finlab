import { combineReducers } from '@reduxjs/toolkit';
import incomesSlice from '../features/incomes/incomesSlice';

const rootReducer = combineReducers({ incomes: incomesSlice });

export default rootReducer;
