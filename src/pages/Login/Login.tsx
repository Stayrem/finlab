import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import css from './Login.scss';
import SignIn from '../../features/user/components/SignIn/SignIn';
import SignUp from '../../features/user/components/SignUp/SignUp';
import { addUser, getToken, IUserRequest } from '../../features/user/userSlice';

type IFormType = 'SIGN_IN' | 'SIGN_UP';

const onSuccess = (values: IUserRequest): FormData => {
  const formData = new FormData();
  formData.set('username', values.username);
  formData.set('password', values.password);
  return formData;
};

const initialState: IFormType = 'SIGN_IN';

const Login = () => {
  const [formType, changeFormType] = useState<IFormType>(initialState);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const payload = onSuccess(values);
    return dispatch(getToken(payload));
  };
  useEffect(() => {
    document.title = 'Web App | Авторизация';
  }, []);
  return (
    <div className={css.wrapper}>
      <Row justify="center" align="middle">
        <Col span={12}>
          <div className={css.switch}>
            <Button
              disabled={formType === 'SIGN_IN'}
              onClick={() => changeFormType('SIGN_IN')}
            >
              Вход
            </Button>
            <Button
              disabled={formType === 'SIGN_UP'}
              onClick={() => changeFormType('SIGN_UP')}
            >
              Регистрация
            </Button>
          </div>
          {formType === 'SIGN_IN' ? (
            <SignIn onFinish={onFinish} />
          ) : (
            <SignUp onFinish={addUser} onRegistrationComplete={() => changeFormType('SIGN_IN')} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
