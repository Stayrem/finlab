import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import Spinner from '../../components/Spinner/Spinner';
import FetchError from '../../components/FetchError/FetchError';
import { getTransactions } from '../../features/transactions/transactionsSlice';
import TransactionsContent from '../../features/transactions/components/TransactionsContent/TransactionsContent';
import { LoadingStatus } from '../../app/enums';
import WithPageLoadingStatus from '../../hocs/WithPageLoadingStatus/WithPageLoadingStatus';
import { RootState } from '../../store/store';

const getTransactionsInfoFromStore = (store: RootState) => store.default.transactions;

const Transactions = () => {
  const dispatch = useDispatch();
  const transaction = useSelector(getTransactionsInfoFromStore);
  const { data, status } = transaction;
  useEffect(() => {
    dispatch(getTransactions());
  }, []);
  if (status === LoadingStatus.FULFILLED) {
    return (
      <Row>
        <Col s={24} sm={24} md={18} lg={16} xl={12}>
          <TransactionsContent transactions={data} />
        </Col>
      </Row>
    );
  }
  if (status === LoadingStatus.PENDING) {
    return (
      <WithPageLoadingStatus>
        <Spinner />
      </WithPageLoadingStatus>
    );
  }
  if (status === LoadingStatus.FAILED) {
    return (
      <WithPageLoadingStatus>
        <FetchError />
      </WithPageLoadingStatus>
    );
  }
  return null;
};

export default Transactions;
