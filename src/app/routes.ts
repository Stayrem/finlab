import * as React from 'react';
import Statistics from '../pages/Statistics';
import AppPaths from './pathDict';
import Incomes from '../pages/Incomes';

const routes: Array<{
  path: string;
  component: React.Component;
}> = [
  {
    path: AppPaths.statistics,
    component: Statistics,
  },
  {
    path: AppPaths.incomes,
    component: Incomes,
  },
];
export default routes;
