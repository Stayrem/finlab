import * as React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import { privateRoutes } from './routes';
import pathDict from './pathDict';
import Navigation from '../layout/Navigation/Navigation';
import { RootState } from '../store/store';
import Login from '../pages/Login/Login';
import { LoadingStatus } from './enums';

const { Header, Content, Footer } = Layout;

const getIsUserAuth = (state: RootState) => state
  .default.user.loginStatus === LoadingStatus.FULLFIELD;
// eslint-disable-next-line react/destructuring-assignment
const PrivateRoute = ({ isAuth, ...rest }: { isAuth: boolean }) => (isAuth ? (
// eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...rest} />
) : <Redirect to={pathDict.login} />);

const App = () => {
  const isAuth = useSelector(getIsUserAuth);
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              {privateRoutes.map((r) => (
                <PrivateRoute
                  isAuth={isAuth}
                  exact
                  key={r.path}
                  path={r.path}
                  component={r.component}
                />
              ))}
              <Route path={pathDict.root} exact>
                <Redirect to={pathDict.transactions} />
              </Route>
              <Route path={pathDict.login} exact>
                {isAuth ? <Redirect to={pathDict.root} /> : <Login />}
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
