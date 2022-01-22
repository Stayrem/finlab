/* eslint-disable import/prefer-default-export,max-len */

import axios from 'axios';
import apiDict from './apiDict';
import { ITransactionItem } from '../features/transactions/transactionsSlice';
import { getAccessToken, setAccessToken } from './utils';
import { keysToCamel } from '../utils/utils';

const axiosInstance = axios.create({
  baseURL: 'http://3.124.33.206',
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => ({ ...config, headers: { authorization: `Bearer ${getAccessToken()}` } }), (error) => Promise.reject(error));

interface ITransactionResponse {
  data: Array<ITransactionItem>;
}

export interface IUserDataResponse {
  accessToken: string;
  tokenType: string;
}

export const fetchTransactions = async () => axiosInstance
  .get<ITransactionResponse>(apiDict.transactions)
  .then((res) => keysToCamel(res.data))
  .then((res) => res.data.data);

export const setTransaction = async () => axios
  .post(apiDict.transactions)
  .then((res) => res.data.data);

export const fetchLogin = async (userData) => axiosInstance
  .post<IUserDataResponse>(apiDict.login, userData)
  .then((res) => keysToCamel(res.data))
  .then((res) => setAccessToken(res.accessToken));
