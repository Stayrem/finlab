import React, { useMemo } from 'react';
import {
  Divider, Input, Space, Table, Tag,
} from 'antd';
import { useDispatch } from 'react-redux';
import TransactionForm from '../TransactionsForm/TransactionsForm';
import { getTransactions, ITransactionItem } from '../../transactionsSlice';
import { LoadingStatus } from '../../../../app/enums';

const { Search } = Input;

interface ITransactionsDataProps {
  transactionsData: {
    data: ITransactionItem[],
    status: LoadingStatus,
    currentPage: number,
    totalTransactions: number,
    addStatus: LoadingStatus,
  }
}

const onSearch = (value) => console.log(value);

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Сумма',
    dataIndex: 'value',
    key: 'value',
    render: (sum) => `${sum} руб.`,
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Тэги',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: string[] | null) => (
      <>
        {tags !== null && tags.map((tag) => (
          <Tag color={tag} key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
];

const TransactionsContent: React.FC<ITransactionsDataProps> = (props) => {
  const {
    transactionsData: {
      data,
      status,
      totalTransactions,
      currentPage,
      addStatus,
    },
  } = props;
  const dispatch = useDispatch();
  const transactionsDataSource = useMemo(() => data
    .map((transaction, index) => (
      { ...transaction, key: index + 1 })), [currentPage, totalTransactions]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Divider orientation="left">Транзакции</Divider>
      <TransactionForm />
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table
        loading={status === LoadingStatus.PENDING || addStatus === LoadingStatus.PENDING}
        dataSource={transactionsDataSource}
        columns={columns}
        pagination={{
          pageSize: 10,
          total: totalTransactions,
          size: 'default',
          current: currentPage,
          onChange: (page) => dispatch(getTransactions(page)),
        }}
      />

    </Space>
  );
};

export default TransactionsContent;
