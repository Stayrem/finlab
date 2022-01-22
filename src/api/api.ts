/* eslint-disable import/prefer-default-export,max-len */

import axios from 'axios';
import apiDict from './apiDict';
import { ITransactionItem } from '../features/transactions/transactionsSlice';
import { getAccessToken, removeAccessToken, setAccessToken } from './utils';
import { keysToCamel } from '../utils/utils';

const axiosInstance = axios.create({
  baseURL: process.env.HOST,
});

axiosInstance.interceptors.request.use((config) => ({ ...config, headers: { authorization: `Bearer ${getAccessToken()}` } }), (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    removeAccessToken();
    window.history.pushState('', '', '/login');
  }
  return error;
});

interface ITransactionResponse {
  data: Array<ITransactionItem>;
}

export interface IUserDataResponse {
  accessToken: string;
  tokenType: string;
}

interface IUserNameResponse {
  status: string,
  data: { user: string },
}

export const fetchTransactions = async () => axiosInstance
  .get<ITransactionResponse>(apiDict.transactions)
  .then((res) => keysToCamel(res.data))
  .then((res) => res.data);

export const setTransaction = async () => axios
  .post(apiDict.transactions)
  .then((res) => res.data.data);

export const fetchLogin = async (userData) => axiosInstance
  .post<IUserDataResponse>(apiDict.login, userData)
  .then((res) => keysToCamel(res.data))
  .then((res) => setAccessToken(res.accessToken));

export const fetchCheckUser = async () => axiosInstance
  .get<IUserNameResponse>(apiDict.checkUser)
  .then((res) => res.data.data);
