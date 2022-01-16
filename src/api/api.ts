/* eslint-disable import/prefer-default-export,max-len */

import axios, { AxiosResponse } from 'axios';
import apiDict from './apiDict';
import { ITransactionItem } from '../features/transactions/transactionsSlice';

const axiosInstance = axios.create({
  timeout: 1000,
});

interface ITransactionResponse {
  data: Array<ITransactionItem>;
}

export const fetchTransactions = async () => axios
  .get<ITransactionResponse>(apiDict.transactions)
  .then((res) => res.data.data);
