import React, { useMemo } from 'react';
import {
  Divider, Space, Input, Table, Tag,
} from 'antd';
import TransactionForm from '../TransactionsForm/TransactionsForm';
import { ITransactionItem } from '../../transactionsSlice';

const { Search } = Input;

const onSearch = (value) => console.log(value);

const columns = [
  {
    title: 'Название',
    dataIndex: 'transactionType',
    key: 'transactionType',
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
    render: (tags) => (
      <>
        {tags.map((tag) => (
          <Tag color={tag} key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
];

const TransactionsContent = (props: { transactions: Array<ITransactionItem> }) => {
  const { transactions } = props;
  const transactionsDataSource = useMemo(() => transactions
    .map((transaction, index) => ({ ...transaction, key: index + 1 })), [transactions.length]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Divider orientation="left">Lorem Ipsum</Divider>
      <TransactionForm />
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table dataSource={transactionsDataSource} columns={columns} />
    </Space>
  );
};

export default TransactionsContent;
