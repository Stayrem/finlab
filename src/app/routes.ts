import * as React from 'react';
import AppPaths from './pathDict';
import Transactions from '../pages/Transactions';

const routes: Array<{
  path: string;
  component: React.FunctionComponent;
}> = [
  {
    path: AppPaths.transactions,
    component: Transactions,
  },
];
export default routes;
