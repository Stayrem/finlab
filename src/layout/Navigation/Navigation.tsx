import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import pathDict from '../../app/pathDict';

import css from './Navigation.module.scss';

const { Sider } = Layout;

const navList = [
  {
    title: 'Расходы',
    link: pathDict.transactions,
    icon: MinusCircleOutlined,
  },
];

const Navigation = () => (
  <Sider>
    <div className={css.logo} />
    <Menu theme="dark" mode="inline" selectedKeys={[1]}>
      {navList.map((navItem) => (
        <Menu.Item key={navItem.link} icon={<navItem.icon />}>
          <Link to={navItem.link} onClick={() => 1}>
            {navItem.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
);

export default Navigation;
