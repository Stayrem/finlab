import React from 'react';
import { WarningOutlined } from '@ant-design/icons';
import css from './FetchError.scss';

const FetchError = () => (
  <div className={css.container}>
    <WarningOutlined className={css.icon} />
    Ошибка
  </div>
);

export default FetchError;
