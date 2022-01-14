import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
  BarChartOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AppContext from '../../context/Context';
import pathDict from '../../app/pathDict';

import css from './Navigation.module.scss';

const { Sider } = Layout;

const navList = [
  {
    title: 'Стасистика',
    link: pathDict.statistics,
    icon: BarChartOutlined,
  },
  {
    title: 'Доходы',
    link: pathDict.incomes,
    icon: PlusCircleOutlined,
  },
];

const Navigation = () => {
  const { activeMenuItem, setActiveMenuItem } = useContext(AppContext);

  return (
    <Sider>
      <div className={css.logo} />
      <Menu theme="dark" mode="inline" selectedKeys={[activeMenuItem]}>
        {navList.map((navItem) => (
          <Menu.Item key={navItem.link} icon={<navItem.icon />}>
            <Link to={navItem.link} onClick={() => setActiveMenuItem(navItem.link)}>
              {navItem.title}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Navigation;
