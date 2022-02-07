import React, { useEffect } from 'react';
import { Layout, Button } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import css from './App.scss';
import { privateRoutes } from './routes';
import pathDict from './pathDict';
import Navigation from '../layout/Navigation/Navigation';
import { RootState } from '../store/store';
import Login from '../pages/Login/Login';
import { LoadingStatus } from './enums';
import { getUser } from '../features/user/userSlice';
import Spinner from '../components/Spinner/Spinner';
import WithPageLoadingStatus from '../hocs/WithPageLoadingStatus/WithPageLoadingStatus';
import { removeAccessToken } from '../api/utils';

const { Header, Content, Footer } = Layout;

const getUserInfo = (state: RootState) => state.default.user;
// eslint-disable-next-line react/destructuring-assignment
const PrivateRoute = ({ isAuth, ...rest }: { isAuth: boolean }) => (isAuth ? (
// eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...rest} />
) : <Redirect to={pathDict.login} />);

const makeLogout = () => {
  removeAccessToken();
  window.location.reload();
};

const App = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const { loginStatus, userName } = userInfo;
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      {loginStatus === LoadingStatus.PENDING
        ? (
          <WithPageLoadingStatus>
            <Spinner />
          </WithPageLoadingStatus>
        )
        : (
          <Router basename="/app">
            <Layout className={css.layout}>
              <Navigation />
              <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, display: 'flex', alignItems: 'center' }}>
                  {loginStatus === LoadingStatus.FULFILLED && (
                    <div className={css.userInfo}>
                      <strong className={css.userName}>{userName}</strong>
                      <Button onClick={makeLogout} type="link">Выйти</Button>
                    </div>
                  )}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                  <Switch>
                    {privateRoutes.map((r) => (
                      <PrivateRoute
                        isAuth={loginStatus === LoadingStatus.FULFILLED}
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
                      {loginStatus === LoadingStatus.FULFILLED ? <Redirect to={pathDict.root} />
                        : <Login />}
                    </Route>
                  </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
              </Layout>
            </Layout>
          </Router>
        )}
    </>
  );
};

export default App;
