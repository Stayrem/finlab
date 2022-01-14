import * as React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import routes from './routes';
import pathDict from './pathDict';
import Navigation from '../layout/Navigation/Navigation';
import AppContext from '../context/Context';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            {routes.map((route) => (
              <Route exact key={route.path} path={route.path} component={route.component} />
            ))}
            <Route path={pathDict.root}>
              <Redirect to={pathDict.statistics} />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  </Router>

);

export default App;
