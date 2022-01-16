import React, { ReactNode } from 'react';
import css from './WithPageLoadingStatus.scss';

const WithPageLoadingStatus = ({ children }: { children: ReactNode }) => (
  <div className={css.container}>{children}</div>
);

export default WithPageLoadingStatus;
