/* eslint-disable import/prefer-default-export,max-len */

import axios, { AxiosResponse } from 'axios';
import apiDict from './apiDict';
import { IncomeItemType } from '../features/incomes/incomesSlice';

const axiosInstance = axios.create({
  baseURL: 'localhost:9000',
  timeout: 1000,
});

type IncomesType = Array<IncomeItemType>

export const fetchIncomes = async (): Promise<AxiosResponse<IncomesType>> => await axiosInstance.get(apiDict.incomes);
