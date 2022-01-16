import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import css from './Spinner.scss';

const antIcon = <LoadingOutlined className={css.icon} spin />;

const Spinner = () => <Spin indicator={antIcon} />;

export default Spinner;
