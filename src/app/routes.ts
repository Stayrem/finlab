import * as React from 'react';
import AppPaths from './pathDict';
import Transactions from '../pages/Transactions/Transactions';
import Login from '../pages/Login/Login';

const routes: Array<{
  path: string;
  component: React.FunctionComponent;
}> = [
  {
    path: AppPaths.transactions,
    component: Transactions,
  },
  {
    path: AppPaths.login,
    component: Login,
  },
];
export const privateRoutes: Array<{
  path: string;
  component: React.FunctionComponent;
}> = [
  {
    path: AppPaths.transactions,
    component: Transactions,
  },
];

export default routes;
