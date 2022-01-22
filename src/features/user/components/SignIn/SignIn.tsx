import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { IUserRequest } from '../../userSlice';
import { RootState } from '../../../../store/store';
import { LoadingStatus } from '../../../../app/enums';

interface ISignIn {
  onFinish: (values: IUserRequest) => void,
}

const getIsAuthFetchPending = (state: RootState) => state
  .default.user.loginStatus === LoadingStatus.PENDING;

const SignIn = (props: ISignIn) => {
  const { onFinish } = props;
  const isFormPending = useSelector(getIsAuthFetchPending);
  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={(values: IUserRequest) => onFinish(values)}
      layout="vertical"
    >
      <Form.Item
        label="Имя Пользователя"
        name="username"
        rules={[
          {
            required: true,
            message: 'Введите имя пользователя',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Введите свой пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isFormPending}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
