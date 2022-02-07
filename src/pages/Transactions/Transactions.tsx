import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import FetchError from '../../components/FetchError/FetchError';
import { getTransactions } from '../../features/transactions/transactionsSlice';
import TransactionsContent from '../../features/transactions/components/TransactionsContent/TransactionsContent';
import { LoadingStatus } from '../../app/enums';
import WithPageLoadingStatus from '../../hocs/WithPageLoadingStatus/WithPageLoadingStatus';
import { RootState } from '../../store/store';

const getTransactionsInfoFromStore = (store: RootState) => store.default.transactions;

const Transactions = () => {
  const dispatch = useDispatch();
  const transactionsData = useSelector(getTransactionsInfoFromStore);
  useEffect(() => {
    dispatch(getTransactions(1));
  }, []);
  useEffect(() => {
    if (transactionsData.addStatus === LoadingStatus.FULFILLED) {
      dispatch(getTransactions(1));
    }
  }, [transactionsData.addStatus]);
  return (
    transactionsData.status === LoadingStatus.FAILED ? (
      <WithPageLoadingStatus>
        <FetchError />
      </WithPageLoadingStatus>
    ) : (
      <Row>
        <Col sm={24} md={18} lg={16} xl={12}>
          <TransactionsContent transactionsData={transactionsData} />
        </Col>
      </Row>
    )
  );
};

export default Transactions;
