import React, { useEffect } from 'react';
import { getIncomes } from '../features/incomes/incomesSlice';

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    key: 'sum',
  },
];

const Incomes = () => {
  useEffect(() => {
    getIncomes();
  }, []);
  return null;
};

export default Incomes;
